import { useMemo } from 'react'
import { migrationModules, getRiskColor } from '../lib/mock-data'
import './DashboardPage.css'

export default function DashboardPage() {
  const stats = useMemo(() => {
    const total = migrationModules.length
    const complete = migrationModules.filter((m) => m.status === 'complete').length
    const inProgress = migrationModules.filter((m) => m.status === 'in-progress').length
    const blocked = migrationModules.filter((m) => m.status === 'blocked').length
    const notStarted = migrationModules.filter((m) => m.status === 'not-started').length

    const overallProgress = Math.round(
      migrationModules.reduce((s, m) => s + m.progress, 0) / total
    )

    const totalBreaking = migrationModules.reduce((s, m) => s + m.breakingChanges, 0)
    const resolvedBreaking = migrationModules
      .filter((m) => m.status === 'complete')
      .reduce((s, m) => s + m.breakingChanges, 0)

    const totalEffort = migrationModules.reduce((s, m) => s + m.effortHours, 0)
    const completedEffort = migrationModules
      .filter((m) => m.status === 'complete')
      .reduce((s, m) => s + m.effortHours, 0)

    return {
      total, complete, inProgress, blocked, notStarted,
      overallProgress, totalBreaking, resolvedBreaking,
      totalEffort, completedEffort,
    }
  }, [])

  // Velocity data (simulated weeks)
  const velocityData = [
    { week: 'W1', modules: 0 },
    { week: 'W2', modules: 1 },
    { week: 'W3', modules: 1 },
    { week: 'W4', modules: 2 },
    { week: 'W5', modules: 2 },
    { week: 'W6', modules: 2 },
  ]

  const maxVelocity = Math.max(...velocityData.map((d) => d.modules), 1)

  return (
    <div className="container dash-page">
      <div className="page-header">
        <h1>Progress Dashboard</h1>
        <p>Real-time tracking of migration progress across all modules and phases.</p>
      </div>

      {/* Top stats */}
      <div className="dash-stats">
        <div className="card dash-stat">
          <div className="dash-stat__value" style={{ color: 'var(--accent)' }}>
            {stats.overallProgress}%
          </div>
          <div className="dash-stat__label">Overall Progress</div>
          <div className="progress-bar" style={{ marginTop: 12 }}>
            <div className="progress-bar__fill" style={{ width: `${stats.overallProgress}%` }} />
          </div>
        </div>
        <div className="card dash-stat">
          <div className="dash-stat__value" style={{ color: 'var(--green)' }}>
            {stats.complete}/{stats.total}
          </div>
          <div className="dash-stat__label">Modules Complete</div>
        </div>
        <div className="card dash-stat">
          <div className="dash-stat__value" style={{ color: 'var(--amber)' }}>
            {stats.resolvedBreaking}/{stats.totalBreaking}
          </div>
          <div className="dash-stat__label">Breaking Changes Resolved</div>
        </div>
        <div className="card dash-stat">
          <div className="dash-stat__value" style={{ color: 'var(--accent)' }}>
            {stats.completedEffort}h/{stats.totalEffort}h
          </div>
          <div className="dash-stat__label">Effort Spent/Total</div>
        </div>
      </div>

      <div className="dash-grid">
        {/* Module progress */}
        <div className="card dash-modules">
          <h3>Module Progress</h3>
          <div className="dash-module-list">
            {migrationModules.map((mod) => (
              <div key={mod.id} className="dash-module">
                <div className="dash-module__header">
                  <span className="dash-module__name">{mod.name}</span>
                  <span className={`plan-status plan-status--${mod.status}`}>
                    {mod.status.replace(/-/g, ' ')}
                  </span>
                </div>
                <div className="dash-module__bar-row">
                  <div className="progress-bar" style={{ flex: 1 }}>
                    <div
                      className={`progress-bar__fill ${mod.progress === 100 ? 'progress-bar__fill--green' : mod.status === 'blocked' ? 'progress-bar__fill--red' : ''}`}
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                  <span className="dash-module__pct">{mod.progress}%</span>
                </div>
                <div className="dash-module__meta">
                  <span>Risk: <strong style={{ color: getRiskColor(mod.riskScore) }}>{mod.riskScore}</strong></span>
                  <span>Effort: {mod.effortHours}h</span>
                  <span>{mod.assignee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="dash-sidebar">
          {/* Status breakdown */}
          <div className="card">
            <h3>Status Breakdown</h3>
            <div className="dash-status-list">
              <StatusRow label="Complete" count={stats.complete} total={stats.total} color="var(--green)" />
              <StatusRow label="In Progress" count={stats.inProgress} total={stats.total} color="var(--accent)" />
              <StatusRow label="Not Started" count={stats.notStarted} total={stats.total} color="var(--text-muted)" />
              <StatusRow label="Blocked" count={stats.blocked} total={stats.total} color="var(--red)" />
            </div>
          </div>

          {/* Velocity chart */}
          <div className="card">
            <h3>Weekly Velocity</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              Modules completed per week
            </p>
            <div className="dash-velocity">
              {velocityData.map((d) => (
                <div key={d.week} className="dash-velocity__bar-group">
                  <div className="dash-velocity__bar-track">
                    <div
                      className="dash-velocity__bar"
                      style={{ height: `${(d.modules / maxVelocity) * 100}%` }}
                    />
                  </div>
                  <span className="dash-velocity__label">{d.week}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regression alerts */}
          <div className="card">
            <h3>Alerts</h3>
            <div className="dash-alerts">
              <div className="dash-alert dash-alert--warning">
                <span className="dash-alert__icon">{'\u26A0'}</span>
                <div>
                  <strong>Auth Module blocked</strong>
                  <p>Depends on API Layer migration (Phase 4)</p>
                </div>
              </div>
              <div className="dash-alert dash-alert--info">
                <span className="dash-alert__icon">{'\u2139'}</span>
                <div>
                  <strong>Phase 1 complete</strong>
                  <p>Build system and module migration finished</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusRow({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = Math.round((count / total) * 100)
  return (
    <div className="dash-status-row">
      <div className="dash-status-row__header">
        <span style={{ color }}>{label}</span>
        <span className="dash-status-row__count">{count}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}
