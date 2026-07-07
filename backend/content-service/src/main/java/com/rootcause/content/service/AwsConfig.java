package com.rootcause.content.service;

import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AwsConfig {

    @Value("${aws.region:ap-south-1}")
    private String region;

    /**
     * S3Client — uses DefaultCredentialsProvider which automatically picks up:
     *   Local dev:  ~/.aws/credentials or env vars AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY
     *   On AWS EC2/ECS: the IAM role attached to the instance/task (no keys needed)
     */
    @Bean
    @Profile("!local")
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
    }

    // CommonMark Markdown parser beans

    @Bean
    public Parser markdownParser() {
        return Parser.builder().build();
    }

    @Bean
    public HtmlRenderer htmlRenderer() {
        return HtmlRenderer.builder().build();
    }
}
