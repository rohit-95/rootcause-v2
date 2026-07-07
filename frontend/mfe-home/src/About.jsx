import React from "react";

export default function About() {
  return (
    <>
      <section className="ab-hero">
        <div className="ab-hero-inner">
          <div className="ab-avatar">RS</div>
          <div>
            <h1 className="ab-name">Rohit Sutar</h1>
            <p className="ab-role">DevOps &amp; Platform Engineer · 7+ years</p>
            <div className="ab-links">
              <a href="https://instagram.com/rootcausedaily" target="_blank" rel="noopener noreferrer" className="ab-link ab-link--ig">📷 @rootcausedaily</a>
              <a href="https://www.youtube.com/@rootcause-hq" target="_blank" rel="noopener noreferrer" className="ab-link ab-link--yt">▶ rootcause-hq</a>
              <a href="mailto:rsutar.2408@gmail.com" className="ab-link">✉ rsutar.2408@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner ab-layout">
          <div className="ab-main">
            <div className="ab-block">
              <div className="ab-block-label">Who I Am</div>
              <p className="ab-lead">I am Rohit Sutar — a DevOps and Platform Engineer with 7+ years of experience building, scaling, and debugging cloud-native systems in production.</p>
              <p>My work spans the full DevOps stack: writing Dockerfiles, managing Kubernetes clusters, setting up CI/CD pipelines, configuring Nginx, debugging live incidents at odd hours, and building observability from scratch. Most of the fixes in the Production Fixes section are things I have personally dealt with on real systems.</p>
              <p>Outside of work I share DevOps content on Instagram and YouTube — short tips, scenario breakdowns, and production war stories that do not fit in a tweet.</p>
            </div>

            <div className="ab-block">
              <div className="ab-block-label">Why I Built Root Cause Daily</div>
              <p>I have been on both sides of the DevOps interview table — as a candidate and as someone interviewing engineers. The same pattern kept repeating: people who memorized documentation would freeze the moment you asked a real scenario. People who had operated systems in production would answer naturally, even for tools they had only touched briefly.</p>
              <p>The gap is not knowledge. It is exposure. Knowing what a cron job is and knowing how to debug one that stopped running without leaving any errors are two completely different things.</p>
              <p>Most interview prep on the internet teaches the first. I built Root Cause Daily to teach the second — scenario-based questions written around how production actually breaks, with model answers that show how a senior engineer thinks through a problem, not just what the answer is.</p>
              <p>The Production Fixes section exists for the same reason: the best way to build that mental model is to read real incidents, understand the root cause, and see the exact steps that fixed it.</p>
            </div>

            <div className="ab-block">
              <div className="ab-block-label">What I Work With</div>
              <div className="ab-skills">
                <span className="ab-skill ab-skill--linux">Linux</span>
                <span className="ab-skill ab-skill--docker">Docker</span>
                <span className="ab-skill ab-skill--k8s">Kubernetes</span>
                <span className="ab-skill ab-skill--aws">AWS</span>
                <span className="ab-skill">Terraform</span>
                <span className="ab-skill">GitHub Actions</span>
                <span className="ab-skill">ArgoCD</span>
                <span className="ab-skill">Helm</span>
                <span className="ab-skill">Prometheus</span>
                <span className="ab-skill">Grafana</span>
                <span className="ab-skill">Nginx</span>
                <span className="ab-skill">GitOps</span>
                <span className="ab-skill">CI/CD</span>
                <span className="ab-skill">DevSecOps</span>
              </div>
            </div>
          </div>

          <aside className="ab-sidebar">
            <div className="ab-card">
              <div className="ab-card-title">Find Me Online</div>
              <ul className="ab-card-list">
                <li><a href="https://instagram.com/rootcausedaily" target="_blank" rel="noopener noreferrer">📷 Instagram — @rootcausedaily</a></li>
                <li><a href="https://www.youtube.com/@rootcause-hq" target="_blank" rel="noopener noreferrer">▶ YouTube — rootcause-hq</a></li>
                <li><a href="mailto:rsutar.2408@gmail.com">✉ rsutar.2408@gmail.com</a></li>
              </ul>
            </div>

            <div className="ab-card">
              <div className="ab-card-title">What I Cover Here</div>
              <ul className="ab-card-list">
                <li>📄 In-depth notes PDFs</li>
                <li>🎯 Scenario interview questions</li>
                <li>🔥 Production failure stories</li>
                <li>🔧 Real production fixes</li>
                <li>📖 Deep-dive articles</li>
              </ul>
            </div>

            <div className="ab-card">
              <div className="ab-card-title">Topics</div>
              <ul className="ab-card-list">
                <li><a href="/interview-prep/linux">Linux</a> — Available Now</li>
                <li><a href="/interview-prep/docker">Docker</a> — Coming Soon</li>
                <li><a href="/interview-prep/kubernetes">Kubernetes</a> — Coming Soon</li>
                <li><a href="/interview-prep/aws">AWS</a> — Coming Soon</li>
                <li><a href="/interview-prep/cicd">CI/CD</a> — Coming Soon</li>
              </ul>
            </div>

            <div className="ab-card ab-card--cta">
              <div className="ab-card-title">Follow Along</div>
              <p>Short DevOps tips, production war stories, and scenario breakdowns — on Instagram and YouTube.</p>
              <a href="https://instagram.com/rootcausedaily" target="_blank" rel="noopener noreferrer" className="btn-primary ab-cta-btn" style={{ marginBottom: 10 }}>📷 Instagram</a>
              <a href="https://www.youtube.com/@rootcause-hq" target="_blank" rel="noopener noreferrer" className="btn-secondary ab-cta-btn">▶ YouTube</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
