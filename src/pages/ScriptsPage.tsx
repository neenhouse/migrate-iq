import { useState } from 'react'
import { scriptTemplates } from '../lib/mock-data'
import './ScriptsPage.css'

export default function ScriptsPage() {
  const [activeId, setActiveId] = useState(scriptTemplates[0].id)
  const active = scriptTemplates.find((t) => t.id === activeId) ?? scriptTemplates[0]

  return (
    <div className="container scripts-page">
      <div className="page-header">
        <h1>Migration Script Templates</h1>
        <p>Auto-generated codemods for common migration patterns. Review before/after code and manual steps.</p>
      </div>

      {/* Template selector */}
      <div className="scripts-tabs">
        {scriptTemplates.map((tpl) => (
          <button
            key={tpl.id}
            className={`scripts-tab ${activeId === tpl.id ? 'scripts-tab--active' : ''}`}
            onClick={() => setActiveId(tpl.id)}
          >
            <span className="scripts-tab__from">{tpl.from}</span>
            <span className="scripts-tab__arrow">{'\u2192'}</span>
            <span className="scripts-tab__to">{tpl.to}</span>
          </button>
        ))}
      </div>

      {/* Active template */}
      <div className="scripts-content">
        <div className="card scripts-header-card">
          <h2>{active.name}</h2>
          <p>{active.description}</p>
          <div className="scripts-badges">
            <span className="badge badge--medium">{active.from}</span>
            <span className="scripts-arrow">{'\u2192'}</span>
            <span className="badge badge--medium">{active.to}</span>
          </div>
        </div>

        {/* Code comparison */}
        <div className="scripts-compare">
          <div className="scripts-code-panel card">
            <div className="scripts-code-label scripts-code-label--before">Before</div>
            <pre className="code-block">{active.beforeCode}</pre>
          </div>
          <div className="scripts-code-panel card">
            <div className="scripts-code-label scripts-code-label--after">After</div>
            <pre className="code-block">{active.afterCode}</pre>
          </div>
        </div>

        {/* Manual steps */}
        <div className="card scripts-manual">
          <h3>Manual Steps Required</h3>
          <p className="scripts-manual__subtitle">
            These changes cannot be automated and require developer review.
          </p>
          <ol className="scripts-steps">
            {active.manualSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Actions */}
        <div className="scripts-actions">
          <button className="btn btn--primary">Apply Script (Dry Run)</button>
          <button className="btn btn--secondary">Download Codemod</button>
          <button className="btn btn--ghost">Export as Diff</button>
        </div>
      </div>
    </div>
  )
}
