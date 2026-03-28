import { Link } from 'react-router-dom'
import './LandingPage.css'

const features = [
  {
    icon: 'upload',
    title: 'Repo Analysis',
    desc: 'Upload your codebase and get an instant breakdown of languages, frameworks, and dependencies.',
  },
  {
    icon: 'graph',
    title: 'Dependency Graph',
    desc: 'Interactive SVG visualization with risk scores. Red means danger, green means safe.',
  },
  {
    icon: 'alert',
    title: 'Breaking Changes',
    desc: 'Detect every API incompatibility, deprecation, and behavioral change before you start.',
  },
  {
    icon: 'plan',
    title: 'Migration Plan',
    desc: 'Phase-by-phase plan with effort estimates, critical path, and parallelization hints.',
  },
  {
    icon: 'code',
    title: 'Script Templates',
    desc: 'Auto-generated codemods for jQuery to React, REST to GraphQL, and more.',
  },
  {
    icon: 'dashboard',
    title: 'Progress Tracking',
    desc: 'Real-time dashboard showing module-level progress, velocity, and regressions.',
  },
  {
    icon: 'rollback',
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

const iconMap: Record<string, string> = {
  upload: '\u2B06',
  graph: '\u2B21',
  alert: '\u26A0',
  plan: '\u2630',
  code: '\u2328',
  dashboard: '\u2B24',
  rollback: '\u21BA',
}

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
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
      <section className="problem-solution">
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
      <section className="features">
        <div className="container">
          <h2 className="section-title">Everything you need for a safe migration</h2>
          <div className="features__grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card card">
                <div className="feature-card__icon">{iconMap[f.icon]}</div>
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
