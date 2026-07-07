import React, { useEffect, useMemo, useState } from "react";
import { fixes } from "./data/fixes";
import { architectures } from "./data/architectures";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onNav = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, []);

  const navigate = (e, href) => {
    e.preventDefault();
    window.history.pushState(null, "", href);
    setPath(href);
  };

  if (path.startsWith("/fixes")) {
    const slug = path.replace(/^\/fixes\/?/, "");
    return slug ? <FixDetail slug={slug} onNavigate={navigate} /> : <FixesList onNavigate={navigate} />;
  }
  if (path.startsWith("/stories")) {
    const slug = path.replace(/^\/stories\/?/, "");
    return slug ? <StoryDetail slug={slug} onNavigate={navigate} /> : <StoriesList onNavigate={navigate} />;
  }
  if (path.startsWith("/architectures")) {
    const slug = path.replace(/^\/architectures\/?/, "");
    return slug ? <ArchitectureDetail slug={slug} onNavigate={navigate} /> : <ArchitecturesList onNavigate={navigate} />;
  }
  return null;
}

// ═══════════════════════════════════════ FIXES ═══════════════════════════════════════

function FixesList({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const allTags = useMemo(() => {
    const tags = new Set();
    fixes.forEach((f) => f.tags.forEach((t) => tags.add(t)));
    return [...tags];
  }, []);

  const visible = useMemo(() => {
    const q = query.toLowerCase().trim();
    return fixes.filter((f) => {
      if (q) {
        const text = (f.title + " " + f.summary + " " + f.tags.join(" ")).toLowerCase();
        return text.includes(q);
      }
      if (activeTag) return f.tags.includes(activeTag);
      return true;
    });
  }, [query, activeTag]);

  return (
    <>
      <section className="fl-hero">
        <div className="fl-hero-inner">
          <h1>Production Fixes</h1>
          <p>Real issues from real deployments. Each fix is tagged by tool so you can find what you need fast.</p>
          <div className="fl-search-wrap">
            <input
              type="text"
              className="fl-search"
              placeholder="Search fixes... e.g. 502, permission denied, OOMKilled"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="fl-search-icon">🔍</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          {!query && (
            <div className="fl-tags">
              <a href="/fixes" className={`fl-tag${!activeTag ? " fl-tag--active" : ""}`} onClick={(e) => { e.preventDefault(); setActiveTag(null); }}>All</a>
              {allTags.map((t) => (
                <a key={t} href={`/fixes?tag=${t}`} className={`fl-tag${activeTag === t ? " fl-tag--active" : ""}`} onClick={(e) => { e.preventDefault(); setActiveTag(t); }}>{t}</a>
              ))}
            </div>
          )}

          {query && <div className="fl-count">{visible.length} fix{visible.length !== 1 ? "es" : ""} found</div>}

          <div className="fl-list">
            {visible.map((f) => {
              const href = `/fixes/${f.slug}`;
              return (
                <a key={f.slug} href={href} className="fl-card" onClick={(e) => onNavigate(e, href)}>
                  <div className="fl-card-tags">
                    {f.tags.map((t) => <span key={t} className="fl-card-tag">{t}</span>)}
                  </div>
                  <h2 className="fl-card-title">{f.title}</h2>
                  <p className="fl-card-summary">{f.summary}</p>
                  <span className="fl-card-cta">Read fix →</span>
                </a>
              );
            })}
          </div>

          {visible.length === 0 && <div className="fl-empty">No fixes match your search.</div>}
        </div>
      </section>
    </>
  );
}

function FixDetail({ slug, onNavigate }) {
  const fix = fixes.find((f) => f.slug === slug);
  if (!fix) return <div style={{ padding: 40, textAlign: "center" }}>Fix not found.</div>;

  return (
    <section className="section">
      <div className="section-inner fd-layout">
        <a href="/fixes" className="fd-back" onClick={(e) => onNavigate(e, "/fixes")}>← Back to all fixes</a>

        <div className="fd-tags">
          {fix.tags.map((t) => <span key={t} className="fl-card-tag">{t}</span>)}
        </div>

        <h1 className="fd-title">{fix.title}</h1>

        <div className="fd-block fd-block--issue">
          <div className="fd-block-label">The Issue</div>
          <p>{fix.issue}</p>
        </div>

        <div className="fd-block fd-block--cause">
          <div className="fd-block-label">Root Cause</div>
          <p>{fix.cause}</p>
        </div>

        <div className="fd-block fd-block--fix">
          <div className="fd-block-label">How to Fix</div>
          <ol className="fd-steps">
            {fix.fix.map((step, i) => <li key={i}><code>{step}</code></li>)}
          </ol>
        </div>

        <div className="fd-footer">
          <a href="/fixes" className="btn-secondary" onClick={(e) => onNavigate(e, "/fixes")}>← More fixes</a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════ STORIES ═══════════════════════════════════════

function StoriesList({ onNavigate }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/content/stories`)
      .then((res) => res.json())
      .then((data) => {
        setStories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading stories...</div>;

  const [featured, ...rest] = stories;

  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          <h1>Stories</h1>
          <p>Production outages, company histories, and tool origins.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          {!featured && <p className="empty-state">Stories coming soon.</p>}

          {featured && (
            <a href={`/stories/${featured.slug}`} className="blog-featured-card" onClick={(e) => onNavigate(e, `/stories/${featured.slug}`)}>
              <div className="bfc-thumb" data-tag={featured.tag}>
                {featured.thumbnail && <img src={featured.thumbnail} alt={featured.title} loading="lazy" />}
                <span className="wn-thumb-tag">{featured.tag}</span>
              </div>
              <div className="bfc-body">
                <span className="card-tag">{featured.tag}</span>
                <h2 className="bfc-title">{featured.title}</h2>
                <span className="card-meta">{featured.readTime} min read · {featured.category}</span>
              </div>
            </a>
          )}

          {rest.length > 0 && (
            <div className="blog-grid">
              {rest.map((s) => {
                const href = `/stories/${s.slug}`;
                return (
                  <a key={s.slug} href={href} className="blog-grid-card" onClick={(e) => onNavigate(e, href)}>
                    <div className="bgc-thumb" data-tag={s.tag}>
                      {s.thumbnail && <img src={s.thumbnail} alt={s.title} loading="lazy" />}
                      <span className="wn-thumb-tag">{s.tag}</span>
                    </div>
                    <div className="bgc-body">
                      <span className="card-tag">{s.tag}</span>
                      <h3 className="bgc-title">{s.title}</h3>
                      <span className="card-meta">{s.readTime} min read · {s.category}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function StoryDetail({ slug, onNavigate }) {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/content/stories/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setStory(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading story...</div>;
  if (error) return <div style={{ padding: 40, textAlign: "center" }}>Error: {error}</div>;

  return (
    <article className="article-page">
      <div className="article-inner">
        <div className="article-meta">
          <span className="card-tag">{story.tag}</span>
          <span className="card-meta">{story.date} · {story.readTime} min read</span>
        </div>
        <h1>{story.title}</h1>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: story.htmlBody }} />
        <div className="article-footer">
          <a href="/stories" className="btn-secondary" onClick={(e) => onNavigate(e, "/stories")}>← Back to stories</a>
        </div>
      </div>
    </article>
  );
}

// ═══════════════════════════════════════ ARCHITECTURES ═══════════════════════════════════════

function ArchitecturesList({ onNavigate }) {
  return (
    <>
      <div className="tools-page-hero">
        <div className="section-inner">
          <p className="tools-page-eyebrow">Project Architectures</p>
          <h1 className="tools-page-title">Real-World Systems<br />for DevOps Interviews</h1>
          <p className="tools-page-sub">Production architectures from companies like Zepto, Razorpay, and Flipkart — explained with components, trade-offs, and the exact interview angles they test.</p>
        </div>
      </div>

      <section className="cat-page-section">
        <div className="section-inner">
          <div className="blog-grid tc-blog-grid">
            {architectures.map((a) => {
              const href = `/architectures/${a.slug}`;
              return (
                <a key={a.slug} href={href} className="blog-grid-card tc-blog-card" onClick={(e) => onNavigate(e, href)}>
                  <div className="bgc-thumb">
                    {a.thumbnail
                      ? <img src={a.thumbnail} alt={a.title} loading="lazy" />
                      : <div className="arch-thumb-fallback" data-tag={a.tag} />}
                    <span className="wn-thumb-tag">{a.icon}</span>
                  </div>
                  <div className="bgc-body">
                    <span className="card-tag">{a.tag}</span>
                    <h3 className="bgc-title">{a.title}</h3>
                    <p className="tc-card-desc">{a.desc}</p>
                    <div className="tc-card-tools">
                      {a.components.map((c) => <span key={c} className="tc-card-pill">{c}</span>)}
                    </div>
                    <span className="card-meta">{a.difficulty} · View Architecture →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function ArchitectureDetail({ slug, onNavigate }) {
  const arch = architectures.find((a) => a.slug === slug);
  if (!arch) return <div style={{ padding: 40, textAlign: "center" }}>Architecture not found.</div>;

  return (
    <>
      <div className="arch-detail-hero" data-tag={arch.tag}>
        <div className="section-inner">
          <a href="/architectures" className="arch-back" onClick={(e) => onNavigate(e, "/architectures")}>← All Architectures</a>
          <div className="arch-detail-meta">
            <span className="card-tag">{arch.tag}</span>
            <span className={`arch-difficulty arch-difficulty-${arch.difficulty}`}>{arch.difficulty}</span>
          </div>
          <h1 className="arch-detail-title">{arch.title}</h1>
          <p className="arch-detail-desc">{arch.desc}</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="arch-coming-soon">
            <div className="arch-cs-icon">🏗️</div>
            <h2 className="arch-cs-title">Coming Soon</h2>
            <p className="arch-cs-text">We're building out the full breakdown for <strong>{arch.title}</strong> — including architecture diagrams, component deep-dives, and scenario-based interview Q&amp;As.</p>
            <a href="/architectures" className="arch-cs-back" onClick={(e) => onNavigate(e, "/architectures")}>← Back to Architectures</a>
          </div>
        </div>
      </section>
    </>
  );
}
