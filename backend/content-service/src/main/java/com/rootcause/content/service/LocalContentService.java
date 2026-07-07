package com.rootcause.content.service;

import lombok.extern.slf4j.Slf4j;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Local dev implementation — reads .md files directly from disk.
 * Activated by: mvn spring-boot:run -Dspring-boot.run.profiles=local
 *
 * No AWS credentials or MySQL needed.
 * Points to your existing root-cause markdown content folder.
 */
@Service
@Profile("local")
@Slf4j
public class LocalContentService implements ContentServicePort {

    private final Path contentRoot;
    private final Parser parser;
    private final HtmlRenderer renderer;

    public LocalContentService(
            @Value("${content.local-path}") String localPath,
            Parser parser,
            HtmlRenderer renderer
    ) {
        this.contentRoot = Paths.get(localPath);
        this.parser = parser;
        this.renderer = renderer;
        log.info("LOCAL profile — reading content from: {}", contentRoot.toAbsolutePath());
    }

    @Override
    public List<ContentService.ArticleMeta> listArticles() {
        return listFiles("articles");
    }

    @Override
    public Optional<ContentService.ArticleDetail> getArticle(String slug) {
        return readFile("articles", slug);
    }

    @Override
    public List<ContentService.ArticleMeta> listFixes() {
        return listFiles("fixes");
    }

    @Override
    public Optional<ContentService.ArticleDetail> getFix(String slug) {
        return readFile("fixes", slug);
    }

    @Override
    public List<ContentService.StoryMeta> listStories() {
        return listStoryFiles("stories");
    }

    @Override
    public Optional<ContentService.StoryDetail> getStory(String slug) {
        return readStoryFile("stories", slug);
    }

    // ── Helpers ───────────────────────────────────────────────────────

    private List<ContentService.ArticleMeta> listFiles(String folder) {
        Path dir = contentRoot.resolve(folder);
        if (!Files.exists(dir)) {
            log.warn("Folder not found: {}", dir);
            return List.of();
        }
        try (Stream<Path> files = Files.list(dir)) {
            return files
                    .filter(p -> p.toString().endsWith(".md"))
                    .map(p -> {
                        String slug = p.getFileName().toString().replace(".md", "");
                        return readFile(folder, slug)
                                .map(d -> new ContentService.ArticleMeta(d.slug(), d.title(), d.summary(), d.date(), d.tags()))
                                .orElse(new ContentService.ArticleMeta(slug, slug, "", "", List.of()));
                    })
                    .collect(Collectors.toList());
        } catch (IOException e) {
            log.error("Error listing {}: {}", dir, e.getMessage());
            return List.of();
        }
    }

    private Optional<ContentService.ArticleDetail> readFile(String folder, String slug) {
        Path file = contentRoot.resolve(folder).resolve(slug + ".md");
        if (!Files.exists(file)) {
            log.warn("File not found: {}", file);
            return Optional.empty();
        }
        try {
            String raw = Files.readString(file);
            FrontMatter fm = parseFrontMatter(raw);
            String html = renderer.render(parser.parse(fm.body()));
            return Optional.of(new ContentService.ArticleDetail(slug, fm.title(), fm.summary(), fm.date(), fm.tags(), html));
        } catch (IOException e) {
            log.error("Error reading {}: {}", file, e.getMessage());
            return Optional.empty();
        }
    }

    private List<ContentService.StoryMeta> listStoryFiles(String folder) {
        Path dir = contentRoot.resolve(folder);
        if (!Files.exists(dir)) {
            log.warn("Folder not found: {}", dir);
            return List.of();
        }
        try (Stream<Path> files = Files.list(dir)) {
            return files
                    .filter(p -> p.toString().endsWith(".md"))
                    .map(p -> {
                        String slug = p.getFileName().toString().replace(".md", "");
                        return readStoryFile(folder, slug)
                                .map(d -> new ContentService.StoryMeta(d.slug(), d.title(), d.date(), d.tag(), d.category(), d.readTime(), d.thumbnail()))
                                .orElse(new ContentService.StoryMeta(slug, slug, "", "", "", null, null));
                    })
                    .collect(Collectors.toList());
        } catch (IOException e) {
            log.error("Error listing {}: {}", dir, e.getMessage());
            return List.of();
        }
    }

    private Optional<ContentService.StoryDetail> readStoryFile(String folder, String slug) {
        Path file = contentRoot.resolve(folder).resolve(slug + ".md");
        if (!Files.exists(file)) {
            log.warn("File not found: {}", file);
            return Optional.empty();
        }
        try {
            String raw = Files.readString(file);
            FrontMatter fm = parseFrontMatter(raw);
            String html = renderer.render(parser.parse(fm.body()));
            return Optional.of(new ContentService.StoryDetail(
                slug, fm.title(), fm.date(), fm.tagSingle(), fm.category(), fm.readTime(), fm.thumbnail(), html
            ));
        } catch (IOException e) {
            log.error("Error reading {}: {}", file, e.getMessage());
            return Optional.empty();
        }
    }

    private record FrontMatter(
        String title, String summary, String date, List<String> tags,
        String category, String thumbnail, Integer readTime, String body
    ) {
        String tagSingle() {
            return tags.isEmpty() ? "" : tags.get(0);
        }
    }

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
                    if (line.startsWith("tags:"))      tags      = List.of(
                        stripQuotes(line.substring(5).trim()).replaceAll("[\\[\\]]", "").split(",\\s*")
                    );
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
}
