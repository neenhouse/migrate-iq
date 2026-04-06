import { Link } from 'react-router-dom'
import './LandingPage.css'

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    title: 'Repo Analysis',
    desc: 'Upload your codebase and get an instant breakdown of languages, frameworks, and dependencies.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M6 9v6c0 1.66 1.34 3 3 3h3" /><line x1="18" y1="9" x2="18" y2="12" />
      </svg>
    ),
    title: 'Dependency Graph',
    desc: 'Interactive SVG visualization with risk scores. Red means danger, green means safe.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: 'Breaking Changes',
    desc: 'Detect every API incompatibility, deprecation, and behavioral change before you start.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    title: 'Migration Plan',
    desc: 'Phase-by-phase plan with effort estimates, critical path, and parallelization hints.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Script Templates',
    desc: 'Auto-generated codemods for jQuery to React, REST to GraphQL, and more.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
    title: 'Progress Tracking',
    desc: 'Real-time dashboard showing module-level progress, velocity, and regressions.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
    title: 'Rollback Planning',
    desc: 'Every migration step has a tested rollback plan. Revert safely, any time.',
  },
]

const stats = [
  { value: '10x', label: 'Faster planning' },
  { value: '95%', label: 'Rollback success' },
  { value: '70%', label: 'Auto-fixable changes' },
  { value: '< 2min', label: 'Analysis time' },
]

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg-bleed" aria-hidden="true">
          <img src="/hero-og.webp" alt="" loading="eager" />
        </div>
        <div className="container hero__inner">
          <div className="hero__badge">Legacy Migration Intelligence</div>
          <h1 className="hero__title">
            Make legacy migration<br />
            <span className="hero__accent">safe</span> and{' '}
            <span className="hero__accent">predictable</span>
          </h1>
          <p className="hero__subtitle">
            Upload your codebase. Get a complete migration plan with dependency graphs,
            risk scores, breaking change detection, effort estimation, auto-generated scripts,
            and rollback planning.
          </p>
          <div className="hero__actions">
            <Link to="/upload" className="btn btn--primary btn--lg">
              Upload Your Repo
            </Link>
            <Link to="/dependencies" className="btn btn--secondary btn--lg">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container stats__grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stats__item">
              <div className="stats__value">{stat.value}</div>
              <div className="stats__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="problem-solution" id="how-it-works">
        <div className="container">
          <h2 className="section-title">Why migrations fail</h2>
          <p className="section-subtitle">
            Legacy migrations fail because teams fly blind. MigrateIQ gives you the instruments.
          </p>
          <div className="ps-grid">
            <div className="ps-card ps-card--problem">
              <h3>Without MigrateIQ</h3>
              <ul>
                <li>Guessing which modules to migrate first</li>
                <li>Discovering breaking changes mid-sprint</li>
                <li>No rollback plan when things go wrong</li>
                <li>Effort estimates off by 3-5x</li>
                <li>Months of untracked progress</li>
              </ul>
            </div>
            <div className="ps-card ps-card--solution">
              <h3>With MigrateIQ</h3>
              <ul>
                <li>Dependency-ordered migration phases</li>
                <li>Every breaking change detected upfront</li>
                <li>Tested rollback scripts for every step</li>
                <li>Accurate per-module effort estimates</li>
                <li>Real-time progress dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Everything you need for a safe migration</h2>
          <div className="features__grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <h2>Ready to make your migration safe?</h2>
          <p>Upload your repository and get a complete migration plan in minutes.</p>
          <Link to="/upload" className="btn btn--primary btn--lg">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  )
}
