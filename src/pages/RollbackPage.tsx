import { useState, useMemo } from 'react'
import { rollbackSteps } from '../lib/mock-data'
import './RollbackPage.css'

export default function RollbackPage() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())

  function toggleCheck(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const phases = useMemo(() => {
    const map = new Map<number, typeof rollbackSteps>()
    rollbackSteps.forEach((s) => {
      const arr = map.get(s.phase) ?? []
      arr.push(s)
      map.set(s.phase, arr)
    })
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0])
  }, [])

  const totalSteps = rollbackSteps.length
  const completedSteps = checkedIds.size
  const totalMinutes = rollbackSteps.reduce((s, r) => s + r.estimatedMinutes, 0)
  const checkedMinutes = rollbackSteps
    .filter((r) => checkedIds.has(r.id))
    .reduce((s, r) => s + r.estimatedMinutes, 0)

  const phaseNames: Record<number, string> = {
    1: 'Foundation',
    2: 'Data Layer',
    3: 'UI & State',
    4: 'Backend',
    5: 'Core & Validation',
  }

  return (
    <div className="container rb-page">
      <div className="page-header">
        <h1>Rollback Planning</h1>
        <p>Pre-tested rollback steps for every migration phase. Check off steps as you execute them.</p>
      </div>

      {/* Summary */}
      <div className="rb-summary">
        <div className="card rb-summary__card">
          <div className="rb-summary__value">{completedSteps}/{totalSteps}</div>
          <div className="rb-summary__label">Steps Completed</div>
          <div className="progress-bar" style={{ marginTop: 8 }}>
            <div
              className="progress-bar__fill"
              style={{ width: `${totalSteps ? (completedSteps / totalSteps) * 100 : 0}%` }}
            />
          </div>
        </div>
        <div className="card rb-summary__card">
          <div className="rb-summary__value">{totalMinutes}m</div>
          <div className="rb-summary__label">Total Rollback Time</div>
        </div>
        <div className="card rb-summary__card">
          <div className="rb-summary__value">{checkedMinutes}m</div>
          <div className="rb-summary__label">Time Elapsed</div>
        </div>
        <div className="card rb-summary__card">
          <div className="rb-summary__value">{phases.length}</div>
          <div className="rb-summary__label">Phases Covered</div>
        </div>
      </div>

      {/* Phase checklists */}
      {phases.map(([phaseNum, steps]) => {
        const phaseCompleted = steps.filter((s) => checkedIds.has(s.id)).length
        return (
          <div key={phaseNum} className="card rb-phase">
            <div className="rb-phase__header">
              <div>
                <h3>Phase {phaseNum}: {phaseNames[phaseNum] ?? `Phase ${phaseNum}`}</h3>
                <p className="rb-phase__meta">
                  {phaseCompleted}/{steps.length} steps &middot;{' '}
                  {steps.reduce((s, r) => s + r.estimatedMinutes, 0)} min estimated
                </p>
              </div>
              <span className={`plan-status ${phaseCompleted === steps.length ? 'plan-status--complete' : phaseCompleted > 0 ? 'plan-status--in-progress' : 'plan-status--not-started'}`}>
                {phaseCompleted === steps.length ? 'done' : phaseCompleted > 0 ? 'in progress' : 'pending'}
              </span>
            </div>

            <div className="rb-steps">
              {steps.map((step) => {
                const isChecked = checkedIds.has(step.id)
                return (
                  <div
                    key={step.id}
                    className={`rb-step ${isChecked ? 'rb-step--done' : ''}`}
                    onClick={() => toggleCheck(step.id)}
                  >
                    <div className="rb-step__check">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          e.stopPropagation()
                          toggleCheck(step.id)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="rb-checkbox"
                      />
                    </div>
                    <div className="rb-step__content">
                      <div className="rb-step__header">
                        <span className="rb-step__module">{step.module}</span>
                        <span className="rb-step__time">{step.estimatedMinutes} min</span>
                      </div>
                      <p className="rb-step__action">{step.action}</p>
                      {step.command && (
                        <code className="rb-step__cmd">{step.command}</code>
                      )}
                      {step.dependencyWarning && (
                        <div className="rb-step__warning">
                          <span>{'\u26A0'}</span> {step.dependencyWarning}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Triggers */}
      <div className="card rb-triggers">
        <h3>Rollback Triggers</h3>
        <p className="rb-triggers__desc">
          The following conditions should trigger an immediate rollback:
        </p>
        <ul className="rb-trigger-list">
          <li>Test failure rate exceeds 10% after migration step</li>
          <li>Error rate spikes more than 5x baseline in production monitoring</li>
          <li>Critical security vulnerability introduced by migration</li>
          <li>Build pipeline fails for more than 2 consecutive attempts</li>
          <li>Performance degradation exceeds 30% on core user paths</li>
        </ul>
      </div>
    </div>
  )
}
