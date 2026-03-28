import { useMemo } from 'react'
import { migrationModules, getRiskColor } from '../lib/mock-data'
import './MigrationPlanPage.css'

export default function MigrationPlanPage() {
  const phases = useMemo(() => {
    const map = new Map<number, typeof migrationModules>()
    migrationModules.forEach((m) => {
      const arr = map.get(m.phase) ?? []
      arr.push(m)
      map.set(m.phase, arr)
    })
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0])
  }, [])

  const totals = useMemo(() => {
    const totalHours = migrationModules.reduce((s, m) => s + m.effortHours, 0)
    const totalPoints = migrationModules.reduce((s, m) => s + m.effortPoints, 0)
    const totalBreaking = migrationModules.reduce((s, m) => s + m.breakingChanges, 0)
    const avgProgress = Math.round(
      migrationModules.reduce((s, m) => s + m.progress, 0) / migrationModules.length
    )
    return { totalHours, totalPoints, totalBreaking, avgProgress }
  }, [])

  const phaseNames: Record<number, string> = {
    1: 'Foundation',
    2: 'Data Layer',
    3: 'UI & State',
    4: 'Backend',
    5: 'Core & Integration',
  }

  return (
    <div className="plan-page">
      <div className="page-header">
        <h1>Migration Plan</h1>
        <p>Phase-by-phase migration plan with per-module effort estimation.</p>
      </div>

      {/* Summary */}
      <div className="plan-summary">
        <div className="card plan-summary__card">
          <div className="plan-summary__value">{totals.totalHours}h</div>
          <div className="plan-summary__label">Total Effort</div>
        </div>
        <div className="card plan-summary__card">
          <div className="plan-summary__value">{totals.totalPoints}pt</div>
          <div className="plan-summary__label">Story Points</div>
        </div>
        <div className="card plan-summary__card">
          <div className="plan-summary__value">{totals.totalBreaking}</div>
          <div className="plan-summary__label">Breaking Changes</div>
        </div>
        <div className="card plan-summary__card">
          <div className="plan-summary__value">{totals.avgProgress}%</div>
          <div className="plan-summary__label">Overall Progress</div>
        </div>
      </div>

      {/* Phase tables */}
      {phases.map(([phaseNum, modules]) => {
        const phaseHours = modules.reduce((s, m) => s + m.effortHours, 0)
        const phaseProgress = Math.round(
          modules.reduce((s, m) => s + m.progress, 0) / modules.length
        )
        return (
          <div key={phaseNum} className="plan-phase card">
            <div className="plan-phase__header">
              <div>
                <h3>Phase {phaseNum}: {phaseNames[phaseNum] ?? `Phase ${phaseNum}`}</h3>
                <p className="plan-phase__meta">
                  {modules.length} modules &middot; {phaseHours}h estimated &middot; {phaseProgress}% complete
                </p>
              </div>
              <div className="plan-phase__progress">
                <div className="progress-bar" style={{ width: 120 }}>
                  <div
                    className="progress-bar__fill"
                    style={{ width: `${phaseProgress}%` }}
                  />
                </div>
                <span className="plan-phase__pct">{phaseProgress}%</span>
              </div>
            </div>

            <div className="plan-table-wrap">
              <table className="plan-table">
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>Status</th>
                    <th>Risk</th>
                    <th>Effort (h)</th>
                    <th>Points</th>
                    <th>Breaking</th>
                    <th>LOC</th>
                    <th>Coverage</th>
                    <th>Assignee</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((mod) => (
                    <tr key={mod.id}>
                      <td className="plan-table__name">{mod.name}</td>
                      <td>
                        <span className={`plan-status plan-status--${mod.status}`}>
                          {mod.status.replace(/-/g, ' ')}
                        </span>
                      </td>
                      <td>
                        <span
                          className="plan-risk"
                          style={{ color: getRiskColor(mod.riskScore) }}
                        >
                          {mod.riskScore}
                        </span>
                      </td>
                      <td>{mod.effortHours}</td>
                      <td>{mod.effortPoints}</td>
                      <td>{mod.breakingChanges}</td>
                      <td>{mod.loc.toLocaleString()}</td>
                      <td>
                        <span className={mod.testCoverage >= 70 ? 'plan-cov--good' : 'plan-cov--low'}>
                          {mod.testCoverage}%
                        </span>
                      </td>
                      <td className="plan-table__assignee">{mod.assignee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}

      {/* Confidence note */}
      <div className="card plan-confidence">
        <h3>Confidence Intervals</h3>
        <p>
          Estimates have an 80% confidence interval of +/- 30%.
          The total project is estimated at <strong>{totals.totalHours}h</strong> ({Math.round(totals.totalHours * 0.7)}h - {Math.round(totals.totalHours * 1.3)}h range),
          or approximately <strong>{Math.round(totals.totalHours / 40)} developer-weeks</strong>.
        </p>
        <p style={{ marginTop: 8 }}>
          Phases 1-2 can run in parallel. Phase 3 depends on Phase 1. Phase 4-5 are sequential.
        </p>
      </div>
    </div>
  )
}
