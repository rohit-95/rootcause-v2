package com.rootcause.content.service;

import java.util.List;
import java.util.Optional;

/**
 * Interface that both ContentService (S3-backed) and LocalContentService (disk-backed) implement.
 * ContentController depends on this interface, not the concrete class.
 * This is the standard way to swap implementations by Spring profile.
 */
public interface ContentServicePort {
    List<ContentService.ArticleMeta> listArticles();
    Optional<ContentService.ArticleDetail> getArticle(String slug);
    List<ContentService.ArticleMeta> listFixes();
    Optional<ContentService.ArticleDetail> getFix(String slug);
    List<ContentService.StoryMeta> listStories();
    Optional<ContentService.StoryDetail> getStory(String slug);
}
