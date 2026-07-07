package com.rootcause.content.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * ContentService — reads Markdown files from S3 and returns them as HTML.
 *
 * S3 structure expected:
 *   rootcause-content/
 *     articles/
 *       ai-agents-database-challenge.md
 *       opentelemetry-ga-what-it-means.md
 *     fixes/
 *       docker-container-exits-immediately.md
 *     stories/
 *       crowdstrike-outage-2024.md
 */
@Service
@Profile("!local")   // S3-backed — disabled when running with local profile
@RequiredArgsConstructor
@Slf4j
public class ContentService implements ContentServicePort {

    private final S3Client s3Client;
    private final Parser markdownParser;
    private final HtmlRenderer htmlRenderer;

    @Value("${aws.s3.content-bucket}")
    private String contentBucket;

    // ── DTOs ─────────────────────────────────────────────────────────────

    public record ArticleMeta(
        String slug,
        String title,
        String summary,
        String date,
        List<String> tags
    ) {}

    public record ArticleDetail(
        String slug,
        String title,
        String summary,
        String date,
        List<String> tags,
        String htmlBody  // parsed from Markdown
    ) {}

    public record StoryMeta(
        String slug,
        String title,
        String date,
        String tag,
        String category,
        Integer readTime,
        String thumbnail
    ) {}

    public record StoryDetail(
        String slug,
        String title,
        String date,
        String tag,
        String category,
        Integer readTime,
        String thumbnail,
        String htmlBody
    ) {}

    // ── Articles ─────────────────────────────────────────────────────────

    /**
     * List all .md files under articles/ in S3 and return their metadata.
     * @Cacheable means this result is cached after the first call —
     * S3 isn't hit again until the cache is evicted.
     */
    @Cacheable("articles-list")
    public List<ArticleMeta> listArticles() {
        return listKeys("articles/").stream()
                .map(key -> fetchMeta(key, slugFromKey(key)))
                .collect(Collectors.toList());
    }

    @Cacheable(value = "article-detail", key = "#slug")
    public Optional<ArticleDetail> getArticle(String slug) {
        return fetchDetail("articles/" + slug + ".md", slug);
    }

    // ── Fixes ─────────────────────────────────────────────────────────────

    @Cacheable("fixes-list")
    public List<ArticleMeta> listFixes() {
        return listKeys("fixes/").stream()
                .map(key -> fetchMeta(key, slugFromKey(key)))
                .collect(Collectors.toList());
    }

    @Cacheable(value = "fix-detail", key = "#slug")
    public Optional<ArticleDetail> getFix(String slug) {
        return fetchDetail("fixes/" + slug + ".md", slug);
    }

    // ── Stories ──────────────────────────────────────────────────────────

    @Cacheable("stories-list")
    public List<StoryMeta> listStories() {
        return listKeys("stories/").stream()
                .map(key -> fetchStoryMeta(key, slugFromKey(key)))
                .collect(Collectors.toList());
    }

    @Cacheable(value = "story-detail", key = "#slug")
    public Optional<StoryDetail> getStory(String slug) {
        return fetchStoryDetail("stories/" + slug + ".md", slug);
    }

    // ── Private helpers ───────────────────────────────────────────────────

    /** List all object keys under a prefix in the S3 bucket */
    private List<String> listKeys(String prefix) {
        var request = ListObjectsV2Request.builder()
                .bucket(contentBucket)
                .prefix(prefix)
                .build();
        return s3Client.listObjectsV2(request)
                .contents().stream()
                .map(S3Object::key)
                .filter(key -> key.endsWith(".md"))
                .collect(Collectors.toList());
    }

    /** Fetch a .md file from S3 and parse front-matter + body */
    private Optional<ArticleDetail> fetchDetail(String s3Key, String slug) {
        try {
            String raw = fetchRaw(s3Key);
            FrontMatter fm = parseFrontMatter(raw);
            String html = markdownToHtml(fm.body());

            return Optional.of(new ArticleDetail(
                slug, fm.title(), fm.summary(), fm.date(), fm.tags(), html
            ));
        } catch (NoSuchKeyException e) {
            log.warn("S3 key not found: {}", s3Key);
            return Optional.empty();
        } catch (Exception e) {
            log.error("Error fetching {}: {}", s3Key, e.getMessage());
            return Optional.empty();
        }
    }

    private ArticleMeta fetchMeta(String s3Key, String slug) {
        try {
            String raw = fetchRaw(s3Key);
            FrontMatter fm = parseFrontMatter(raw);
            return new ArticleMeta(slug, fm.title(), fm.summary(), fm.date(), fm.tags());
        } catch (Exception e) {
            log.error("Error fetching meta for {}: {}", s3Key, e.getMessage());
            return new ArticleMeta(slug, slug, "", "", List.of());
        }
    }

    private Optional<StoryDetail> fetchStoryDetail(String s3Key, String slug) {
        try {
            String raw = fetchRaw(s3Key);
            FrontMatter fm = parseFrontMatter(raw);
            String html = markdownToHtml(fm.body());
            return Optional.of(new StoryDetail(
                slug, fm.title(), fm.date(), fm.tagSingle(), fm.category(), fm.readTime(), fm.thumbnail(), html
            ));
        } catch (NoSuchKeyException e) {
            log.warn("S3 key not found: {}", s3Key);
            return Optional.empty();
        } catch (Exception e) {
            log.error("Error fetching {}: {}", s3Key, e.getMessage());
            return Optional.empty();
        }
    }

    private StoryMeta fetchStoryMeta(String s3Key, String slug) {
        try {
            String raw = fetchRaw(s3Key);
            FrontMatter fm = parseFrontMatter(raw);
            return new StoryMeta(slug, fm.title(), fm.date(), fm.tagSingle(), fm.category(), fm.readTime(), fm.thumbnail());
        } catch (Exception e) {
            log.error("Error fetching meta for {}: {}", s3Key, e.getMessage());
            return new StoryMeta(slug, slug, "", "", "", null, null);
        }
    }

    /** Download a raw .md file from S3 as a String */
    private String fetchRaw(String key) throws Exception {
        var request = GetObjectRequest.builder()
                .bucket(contentBucket)
                .key(key)
                .build();
        try (ResponseInputStream<?> stream = s3Client.getObject(request);
             BufferedReader reader = new BufferedReader(
                     new InputStreamReader(stream, StandardCharsets.UTF_8))) {
            return reader.lines().collect(Collectors.joining("\n"));
        }
    }

    /**
     * Parse YAML front-matter from Markdown.
     * Expected format at top of each .md file:
     *   ---
     *   title: My Article Title
     *   summary: Short description
     *   date: 2026-06-26
     *   tags: [Docker, Linux]
     *   ---
     *   # Actual content starts here
     */
    private FrontMatter parseFrontMatter(String raw) {
        String title = "", summary = "", date = "", category = "", thumbnail = "";
        List<String> tags = List.of();
        Integer readTime = null;
        String body = raw;

        if (raw.startsWith("---")) {
            int end = raw.indexOf("---", 3);
            if (end > 0) {
                String fm = raw.substring(3, end).trim();
                body = raw.substring(end + 3).trim();
                for (String line : fm.split("\n")) {
                    if (line.startsWith("title:"))     title     = stripQuotes(line.substring(6).trim());
                    if (line.startsWith("summary:"))   summary   = stripQuotes(line.substring(8).trim());
                    if (line.startsWith("excerpt:"))   summary   = stripQuotes(line.substring(8).trim());
                    if (line.startsWith("date:"))      date      = stripQuotes(line.substring(5).trim());
                    if (line.startsWith("category:"))  category  = stripQuotes(line.substring(9).trim());
                    if (line.startsWith("thumbnail:")) thumbnail = stripQuotes(line.substring(10).trim());
                    if (line.startsWith("readTime:"))  readTime  = parseIntOrNull(stripQuotes(line.substring(9).trim()));
                    if (line.startsWith("tag:"))       tags      = List.of(stripQuotes(line.substring(4).trim()));
                    if (line.startsWith("tags:")) {
                        String t = stripQuotes(line.substring(5).trim())
                                .replaceAll("[\\[\\]]", "");
                        tags = List.of(t.split(",\\s*"));
                    }
                }
            }
        }
        return new FrontMatter(title, summary, date, tags, category, thumbnail, readTime, body);
    }

    private static Integer parseIntOrNull(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    /** Strip surrounding double or single quotes from a YAML scalar value */
    private static String stripQuotes(String value) {
        if (value.length() >= 2
                && ((value.startsWith("\"") && value.endsWith("\""))
                || (value.startsWith("'") && value.endsWith("'")))) {
            return value.substring(1, value.length() - 1);
        }
        return value;
    }

    private String markdownToHtml(String markdown) {
        return htmlRenderer.render(markdownParser.parse(markdown));
    }

    private String slugFromKey(String key) {
        // "articles/my-article.md" → "my-article"
        return key.replaceAll(".*/", "").replace(".md", "");
    }

    private record FrontMatter(
        String title, String summary, String date, List<String> tags,
        String category, String thumbnail, Integer readTime, String body
    ) {
        String tagSingle() {
            return tags.isEmpty() ? "" : tags.get(0);
        }
    }
}
