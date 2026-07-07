package com.rootcause.content.controller;

import com.rootcause.content.service.ContentService.ArticleMeta;
import com.rootcause.content.service.ContentService.ArticleDetail;
import com.rootcause.content.service.ContentService.StoryMeta;
import com.rootcause.content.service.ContentService.StoryDetail;
import com.rootcause.content.service.ContentServicePort;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller — all endpoints prefixed with /api/content
 * These are called by the React micro-apps in the frontend.
 */
@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
// Allow the frontend (different port/domain) to call these endpoints
@CrossOrigin(origins = {
    "http://localhost:9000",   // root-config dev server
    "http://localhost:3003",   // mfe-articles dev server
    "http://localhost:3004",   // mfe-fixes dev server (fixes/stories/architectures)
    "https://rootcausedaily.com"
})
public class ContentController {

    private final ContentServicePort contentService;

    /**
     * GET /api/content/articles
     * Returns list of all articles with metadata (no full HTML body).
     * Used by the articles list page.
     */
    @GetMapping("/articles")
    public ResponseEntity<List<ArticleMeta>> listArticles() {
        return ResponseEntity.ok(contentService.listArticles());
    }

    /**
     * GET /api/content/articles/{slug}
     * Returns full article with parsed HTML body.
     * Used by the article detail page.
     */
    @GetMapping("/articles/{slug}")
    public ResponseEntity<ArticleDetail> getArticle(@PathVariable String slug) {
        return contentService.getArticle(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/content/fixes
     */
    @GetMapping("/fixes")
    public ResponseEntity<List<ArticleMeta>> listFixes() {
        return ResponseEntity.ok(contentService.listFixes());
    }

    /**
     * GET /api/content/fixes/{slug}
     */
    @GetMapping("/fixes/{slug}")
    public ResponseEntity<ArticleDetail> getFix(@PathVariable String slug) {
        return contentService.getFix(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/content/stories
     */
    @GetMapping("/stories")
    public ResponseEntity<List<StoryMeta>> listStories() {
        return ResponseEntity.ok(contentService.listStories());
    }

    /**
     * GET /api/content/stories/{slug}
     */
    @GetMapping("/stories/{slug}")
    public ResponseEntity<StoryDetail> getStory(@PathVariable String slug) {
        return contentService.getStory(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
