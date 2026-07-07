import React, { useEffect, useState } from "react";

// Base URL for your Java backend API
// In local dev: Spring Boot runs on 8080
// In prod: replace with your API Gateway URL via env variable
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onNav = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, []);

  // Intercept clicks on internal /articles links so single-spa handles
  // navigation client-side instead of a full page reload.
  const navigate = (e, href) => {
    e.preventDefault();
    window.history.pushState(null, "", href);
    setPath(href);
  };

  const slug = path.replace(/^\/articles\/?/, "");

  return slug
    ? <ArticleDetail slug={slug} onNavigate={navigate} />
    : <ArticleList onNavigate={navigate} />;
}

function ArticleList({ onNavigate }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/content/articles`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.state}>Loading articles...</div>;
  if (error)   return <div style={styles.state}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Articles</h1>
      <div style={styles.grid}>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({ article, onNavigate }) {
  const href = `/articles/${article.slug}`;
  return (
    <a href={href} style={styles.card} onClick={(e) => onNavigate(e, href)}>
      <div style={styles.cardTags}>
        {article.tags?.map((tag) => (
          <span key={tag} style={styles.tag}>{tag}</span>
        ))}
      </div>
      <h2 style={styles.cardTitle}>{article.title}</h2>
      <p style={styles.cardSummary}>{article.summary}</p>
      <span style={styles.cardCta}>Read article →</span>
    </a>
  );
}

function ArticleDetail({ slug, onNavigate }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/content/articles/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div style={styles.state}>Loading article...</div>;
  if (error)   return <div style={styles.state}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <a href="/articles" style={styles.back} onClick={(e) => onNavigate(e, "/articles")}>← Back to articles</a>
      <div style={styles.cardTags}>
        {article.tags?.map((tag) => (
          <span key={tag} style={styles.tag}>{tag}</span>
        ))}
      </div>
      <h1 style={styles.detailTitle}>{article.title}</h1>
      <p style={styles.detailMeta}>{article.date}</p>
      <div style={styles.detailBody} dangerouslySetInnerHTML={{ __html: article.htmlBody }} />
    </div>
  );
}

const styles = {
  container:   { maxWidth: 900, margin: "0 auto", padding: "40px 24px" },
  heading:     { fontSize: 28, fontWeight: 700, marginBottom: 32, color: "#e2e8f0" },
  grid:        { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 },
  card:        { display: "block", background: "#1e2130", borderRadius: 10, padding: 24, textDecoration: "none", border: "1px solid #2d3148" },
  cardTags:    { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" },
  tag:         { fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "#6366f122", color: "#818cf8", border: "1px solid #6366f144" },
  cardTitle:   { fontSize: 16, fontWeight: 600, color: "#e2e8f0", marginBottom: 10, lineHeight: 1.4 },
  cardSummary: { fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 16 },
  cardCta:     { fontSize: 13, color: "#6366f1", fontWeight: 500 },
  state:       { padding: 40, textAlign: "center", color: "#94a3b8" },
  back:        { display: "inline-block", marginBottom: 24, color: "#6366f1", textDecoration: "none", fontSize: 14 },
  detailTitle: { fontSize: 32, fontWeight: 700, color: "#e2e8f0", marginBottom: 8, lineHeight: 1.3 },
  detailMeta:  { fontSize: 13, color: "#94a3b8", marginBottom: 32 },
  detailBody:  { color: "#cbd5e1", fontSize: 16, lineHeight: 1.8 },
};
