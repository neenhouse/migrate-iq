import { useState, useMemo } from 'react'
import { breakingChanges, getSeverityColor } from '../lib/mock-data'
import type { BreakingChange } from '../lib/mock-data'
import './BreakingChangesPage.css'

type SeverityFilter = 'all' | BreakingChange['severity']

export default function BreakingChangesPage() {
  const [filter, setFilter] = useState<SeverityFilter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'all') return breakingChanges
    return breakingChanges.filter((bc) => bc.severity === filter)
  }, [filter])

  const counts = useMemo(() => ({
    all: breakingChanges.length,
    critical: breakingChanges.filter((b) => b.severity === 'critical').length,
    high: breakingChanges.filter((b) => b.severity === 'high').length,
    medium: breakingChanges.filter((b) => b.severity === 'medium').length,
    low: breakingChanges.filter((b) => b.severity === 'low').length,
  }), [])

  return (
    <div className="bc-page">
      <div className="page-header">
        <h1>Breaking Change Detector</h1>
        <p>All breaking changes detected in the codebase, categorized by severity.</p>
      </div>

      {/* Summary cards */}
      <div className="bc-summary">
        {(['critical', 'high', 'medium', 'low'] as const).map((sev) => (
          <div
            key={sev}
            className={`card bc-summary__card ${filter === sev ? 'bc-summary__card--active' : ''}`}
            onClick={() => setFilter(filter === sev ? 'all' : sev)}
            style={{ cursor: 'pointer' }}
          >
            <div className="bc-summary__count" style={{ color: getSeverityColor(sev) }}>
              {counts[sev]}
            </div>
            <div className="bc-summary__label">{sev}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bc-toolbar">
        <div className="bc-filters">
          {(['all', 'critical', 'high', 'medium', 'low'] as const).map((f) => (
            <button
              key={f}
              className={`btn btn--ghost bc-filter-btn ${filter === f ? 'bc-filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="bc-list">
        {filtered.map((bc) => {
          const isExpanded = expandedId === bc.id
          return (
            <div
              key={bc.id}
              className={`card bc-item ${isExpanded ? 'bc-item--expanded' : ''}`}
              onClick={() => setExpandedId(isExpanded ? null : bc.id)}
            >
              <div className="bc-item__header">
                <span className={`badge badge--${bc.severity}`}>{bc.severity}</span>
                <span className="bc-item__file">
                  {bc.file}:{bc.line}
                </span>
                <span className="bc-item__autofix">
                  {bc.autoFixAvailable ? (
                    <span className="bc-autofix bc-autofix--yes">Auto-fix available</span>
                  ) : (
                    <span className="bc-autofix bc-autofix--no">Manual fix required</span>
                  )}
                </span>
              </div>
              <p className="bc-item__desc">{bc.description}</p>

              {isExpanded && (
                <div className="bc-item__details">
                  <div className="bc-code-compare">
                    <div className="bc-code-panel bc-code-panel--before">
                      <div className="bc-code-panel__label">Current</div>
                      <code className="bc-code-snippet">{bc.currentPattern}</code>
                    </div>
                    <div className="bc-code-arrow">{'\u2192'}</div>
                    <div className="bc-code-panel bc-code-panel--after">
                      <div className="bc-code-panel__label">Required</div>
                      <code className="bc-code-snippet">{bc.requiredChange}</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
