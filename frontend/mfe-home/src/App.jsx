import React, { useEffect, useRef, useState } from "react";
import { courses } from "./data/courses";
import { recentFixes } from "./data/recentFixes";
import { sampleQuestions } from "./data/sampleQuestions";
import About from "./About";
import Roadmap from "./Roadmap";

const SLIDE_DURATION = 9000;

export default function App() {
  const [path] = useState(window.location.pathname);

  if (path === "/about") return <About />;
  if (path === "/roadmap") return <Roadmap />;

  return (
    <>
      <Hero />
      <SampleQuestionCarousel />
      <CoursesGrid />
      <DiffSection />
      <FixesPreview />
      <FailureStoriesTeaser />
      <ArchitecturesTeaser />
      <Faq />
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-badge">🎯 DevOps &amp; DevSecOps Interview Prep</div>
        <h1 className="hero-title">
          Good engineers fix problems.
          <br />
          <span className="hero-accent">Great ones find the root cause.</span>
        </h1>
        <p className="hero-sub">
          Interview prep built around how production actually breaks. Scenario questions with
          model answers, deep notes, and real failure stories — for every major DevOps topic.
          One-time purchase, yours forever.
        </p>
        <div className="hero-actions">
          <a href="/interview-prep/linux" className="btn-primary">Start with Linux →</a>
          <a href="/interview-prep" className="btn-secondary">See All Topics</a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><span className="hero-stat-num">62+</span><span className="hero-stat-label">Scenario Questions</span></div>
          <div className="hero-stat"><span className="hero-stat-divider" /></div>
          <div className="hero-stat"><span className="hero-stat-num">20</span><span className="hero-stat-label">Chapters</span></div>
          <div className="hero-stat"><span className="hero-stat-divider" /></div>
          <div className="hero-stat"><span className="hero-stat-num">8</span><span className="hero-stat-label">DevOps Topics</span></div>
          <div className="hero-stat"><span className="hero-stat-divider" /></div>
          <div className="hero-stat"><span className="hero-stat-num">₹299</span><span className="hero-stat-label">Starts at</span></div>
        </div>
      </div>
    </section>
  );
}

function SampleQuestionCarousel() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef(null);
  const total = sampleQuestions.length;

  const goTo = (idx) => {
    clearTimeout(timerRef.current);
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
      setProgressKey((k) => k + 1);
    }, 300);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % total);
    }, SLIDE_DURATION);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const question = sampleQuestions[current];

  return (
    <section className="section sample-section">
      <div className="section-inner">
        <div className="sample-label-row">
          <div className="sample-label">🔍 Free Sample — See the quality before you buy</div>
          <div className="sample-dots">
            {sampleQuestions.map((_, i) => (
              <button
                key={i}
                className={`sd${i === current ? " sd--active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
        <div className={`sample-card${fading ? " sample-fade-out" : " sample-fade-in"}`}>
          <div className="sample-progress-bar">
            <div key={progressKey} className="sample-progress-fill" style={{ animation: `sample-progress ${SLIDE_DURATION}ms linear forwards` }} />
          </div>
          <div className="sample-card-header">
            <div className="sample-tags">
              <span className="sample-tag" style={{ background: question.color + "22", color: question.color, border: `1px solid ${question.color}44` }}>{question.topic}</span>
              <span className="sample-tag sample-tag--level">{question.level}</span>
              <span className="sample-tag sample-tag--type">{question.type}</span>
            </div>
            <div className="sample-q-num">Question from the Interview Questions PDF</div>
          </div>
          <div className="sample-question">{question.q}</div>
          <div className="sample-answer-teaser">
            <div className="sample-answer-label">🔒 Model Answer — locked in the PDF</div>
            <div className="sample-answer-blur">{question.blur}</div>
            <a href={question.link} className="sample-unlock-btn">{question.cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoursesGrid() {
  return (
    <section className="section courses-section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Every Major DevOps Topic</h2>
          <p className="section-sub">Notes, scenario interview questions, and real failure stories for each topic. Linux is live. More launching soon.</p>
        </div>
        <div className="courses-grid">
          {courses.map((c) => (
            <a key={c.slug} href={`/interview-prep/${c.slug}`} className={`course-card${!c.available ? " course-card--soon" : ""}`}>
              <div className="course-card-top">
                <span className="course-icon" style={{ background: c.color }}>{c.icon}</span>
                {!c.available && <span className="course-badge-soon">Coming Soon</span>}
                {c.available && <span className="course-badge-live">Live Now</span>}
              </div>
              <div className="course-card-body">
                <h3 className="course-name">{c.name}</h3>
                <p className="course-tagline">{c.tagline}</p>
                <div className="course-category">{c.category}</div>
              </div>
              <div className="course-card-footer">
                {c.available
                  ? <span className="course-cta">Notes &amp; Questions →</span>
                  : <span className="course-cta-muted">Coming soon</span>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function DiffSection() {
  const bad = [
    'What is the difference between chmod 755 and chmod 644?',
    'What does the kill command do?',
    'What is a cron job?',
    'List the Linux file permission types.',
    'What is /etc/fstab used for?',
  ];
  const good = [
    "A developer's script works on their laptop but gets permission denied on the server. The file is 755. Debug this.",
    'A process is consuming 100% CPU but your app is idle. How do you identify and handle it without causing downtime?',
    'Your cron job ran fine for weeks. It did not run today. No errors in the log. Diagnose.',
    "A server's load average is 8 but CPU usage shows only 15%. What is happening and how do you fix it?",
    'After a reboot, a mount is missing and your app cannot start. Walk through diagnosing and fixing it permanently.',
  ];
  return (
    <section className="section diff-section">
      <div className="section-inner">
        <h2 className="section-title">Scenario vs Textbook. Here is the Difference.</h2>
        <div className="diff-table">
          <div className="diff-col diff-col--bad">
            <div className="diff-col-header diff-col-header--bad">📚 Textbook Questions (everywhere else)</div>
            {bad.map((t) => <div key={t} className="diff-item diff-item--bad">&quot;{t}&quot;</div>)}
          </div>
          <div className="diff-col diff-col--good">
            <div className="diff-col-header diff-col-header--good">🎯 Scenario Questions (Root Cause)</div>
            {good.map((t) => <div key={t} className="diff-item diff-item--good">&quot;{t}&quot;</div>)}
          </div>
        </div>
        <p className="diff-note">Real interviewers at product companies ask scenarios. They want to see how you think, not what you memorized.</p>
      </div>
    </section>
  );
}

function FixesPreview() {
  return (
    <section className="section fixes-preview-section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Production Fixes</h2>
          <p className="section-sub">Real issues, root causes, and step-by-step fixes — tagged by tool.</p>
        </div>
        <div className="fp-grid">
          {recentFixes.map((f) => (
            <a key={f.slug} href={`/fixes/${f.slug}`} className="fp-card">
              <div className="fp-card-tags">
                {f.tags.map((t) => <span key={t} className="fl-card-tag">{t}</span>)}
              </div>
              <div className="fp-card-title">{f.title}</div>
              <div className="fp-card-summary">{f.summary}</div>
              <span className="fp-card-cta">Read fix →</span>
            </a>
          ))}
        </div>
        <div className="fp-footer">
          <a href="/fixes" className="btn-secondary">Browse all fixes →</a>
        </div>
      </div>
    </section>
  );
}

function FailureStoriesTeaser() {
  return (
    <section className="section failure-teaser-section">
      <div className="section-inner">
        <div className="failure-teaser-box">
          <div className="failure-teaser-text">
            <span className="failure-teaser-eyebrow">🔥 Coming Soon</span>
            <h2>Real Production Failure Stories</h2>
            <p>The cron job that took down payments at 2am. The chmod 777 that caused a data breach. The disk that filled up silently and killed the database. Real incidents, root causes, and what was learned. Nothing makes you stand out in an interview like a war story.</p>
            <span className="failure-teaser-follow">Follow <strong>@rootcausedaily</strong> on Instagram for early previews</span>
          </div>
          <div className="failure-teaser-cards">
            <div className="failure-card">
              <div className="failure-card-icon">🔥</div>
              <div className="failure-card-title">Disk at 100%</div>
              <div className="failure-card-sub">Production DB crash at 3am</div>
            </div>
            <div className="failure-card">
              <div className="failure-card-icon">🔑</div>
              <div className="failure-card-title">chmod 777</div>
              <div className="failure-card-sub">Security incident that cost 3 jobs</div>
            </div>
            <div className="failure-card">
              <div className="failure-card-icon">⚡</div>
              <div className="failure-card-title">Cron + Timezone</div>
              <div className="failure-card-sub">Billing ran twice, 40,000 users charged</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitecturesTeaser() {
  return (
    <section className="section arch-teaser-section">
      <div className="section-inner">
        <div className="arch-teaser-row">
          <div className="arch-teaser-text">
            <h2>How Big Companies Do It</h2>
            <p>Real architecture breakdowns — Netflix, Spotify, Uber, Zomato. See the tools you are learning in action at production scale.</p>
            <a href="/architectures" className="btn-secondary">Browse Architectures →</a>
          </div>
          <div className="arch-teaser-logos">
            <span>Netflix</span>
            <span>Spotify</span>
            <span>Uber</span>
            <span>Airbnb</span>
            <span>Zomato</span>
            <span>Flipkart</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "Is this just another list of interview questions I can find on Google?",
    a: 'No. Google gives you textbook questions — "What is chmod?" or "Explain the Linux boot process." We give you scenario questions — "A developer\'s script works on their laptop but fails on the server with permission denied. The file has 755. Debug this step by step." That is the format real interviewers at product companies use. The model answers are written by engineers who have been on both sides of the table.',
  },
  {
    q: "I am a developer, not a DevOps engineer. Is this for me?",
    a: "Yes, if you are targeting a DevOps, SRE, Platform, or Cloud role — or if your current role involves working with servers, CI/CD, or cloud. The notes assume you have used a terminal before, but do not assume DevOps experience. The interview questions are tiered from beginner to expert.",
  },
  {
    q: "I have an interview in 3 days. Is there time?",
    a: "Yes. In 3 days, skip the notes and go straight to the interview questions PDF. Read all 62 questions and their model answers. Pay extra attention to anything that surprises you — those are your gaps. You will not master Linux in 3 days, but you will know exactly what to say for the most common scenarios.",
  },
  {
    q: "What format are the PDFs? Can I read on my phone?",
    a: "Standard PDF, optimised for reading. They work on phone, tablet, laptop — anything with a PDF viewer. No DRM, no expiry. Download once and keep it forever. Most people use them on their laptop for studying and on their phone for quick review before an interview.",
  },
];

function Faq() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section faq-section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`faq-item${open === i ? " faq-open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                {item.q}
                <span className="faq-chevron">▾</span>
              </button>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
