import React from "react";
import { roadmapPhases } from "./data/roadmap";

export default function Roadmap() {
  return (
    <>
      <section className="rm-hero">
        <div className="rm-hero-inner">
          <div className="rm-badge">DevOps Roadmap 2026</div>
          <h1 className="rm-title">From Beginner to Expert</h1>
          <p className="rm-sub">
            Think of DevOps as a journey:
            <br />
            <strong>Linux → Programming → Cloud → Automate Everything → Design Platforms → Lead Architecture</strong>
          </p>
          <p className="rm-sub" style={{ marginTop: 10 }}>There is no real end. You keep moving toward Platform Engineering, Cloud Architecture, and AI-driven Operations.</p>
        </div>
      </section>

      <section className="section rm-section">
        <div className="section-inner">
          <div className="rm-phases">
            {roadmapPhases.map((phase) => (
              <Phase key={phase.num} phase={phase} />
            ))}
          </div>

          <div className="rm-notify" style={{ marginTop: 48 }}>
            <div className="rm-notify-inner">
              <div className="rm-notify-text">
                <div className="rm-notify-title">Linux is live. Start here.</div>
                <div className="rm-notify-sub">62 scenario questions with model answers, deep notes PDF, and real production fixes. More phases launching soon.</div>
              </div>
              <div className="rm-notify-btns">
                <a href="/interview-prep/linux" className="btn-primary">Start with Linux →</a>
                <a href="https://instagram.com/rootcausedaily" target="_blank" rel="noopener noreferrer" className="btn-secondary">Follow for updates</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Phase({ phase }) {
  return (
    <div className={`rm-phase${phase.major ? " rm-phase--major" : ""}${phase.future ? " rm-phase--future" : ""}`}>
      <div className="rm-phase-head">
        <div className="rm-phase-num">{phase.num}</div>
        <div className="rm-phase-meta">
          <div className="rm-phase-title">{phase.title}</div>
          <div className="rm-phase-duration">{phase.duration}</div>
        </div>
        {phase.tag === "live" && <div className="rm-phase-tag rm-phase-tag--live">Available on Root Cause</div>}
        {phase.tag === "soon" && <div className="rm-phase-tag rm-phase-tag--soon">Coming Soon</div>}
        {phase.tag === "future" && <div className="rm-phase-tag rm-phase-tag--future">Emerging</div>}
      </div>

      {phase.why && <p className="rm-phase-why">{phase.why}</p>}

      {phase.pipelineHorizontal && (
        <div className="rm-pipeline rm-pipeline--horizontal">
          {phase.pipelineHorizontal.map((step, i) => (
            <React.Fragment key={step}>
              <div className={`rm-pipe-step${i === phase.pipelineHorizontal.length - 1 ? " rm-pipe-step--end" : ""}`}>{step}</div>
              {i < phase.pipelineHorizontal.length - 1 && <div className="rm-pipe-arrow">→</div>}
            </React.Fragment>
          ))}
        </div>
      )}

      {phase.cols && (
        <div className="rm-cols">
          {phase.cols.map((col, ci) => (
            <div key={ci}>
              {col.sections.map((sec, si) => (
                <React.Fragment key={sec.label}>
                  <div className="rm-col-label" style={si > 0 ? { marginTop: 12 } : undefined}>
                    {sec.label}{sec.recommended && <span className="rm-rec">Recommended</span>}
                  </div>
                  {sec.items && (
                    <ul className="rm-list">
                      {sec.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </React.Fragment>
              ))}
              {col.pipeline && (
                <div className="rm-pipeline">
                  {col.pipeline.map((step, i) => (
                    <React.Fragment key={step}>
                      <div className={`rm-pipe-step${i === col.pipeline.length - 1 ? " rm-pipe-step--end" : ""}`}>{step}</div>
                      {i < col.pipeline.length - 1 && <div className="rm-pipe-arrow">↓</div>}
                    </React.Fragment>
                  ))}
                </div>
              )}
              {col.cta && <a href={col.cta.href} className="rm-phase-cta">{col.cta.text}</a>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
