import { useState } from 'react'
import { samplePackageJson, sampleRepoAnalysis } from '../lib/mock-data'
import './UploadPage.css'

type AnalysisState = 'idle' | 'analyzing' | 'done'

export default function UploadPage() {
  const [input, setInput] = useState('')
  const [state, setState] = useState<AnalysisState>('idle')
  const [progress, setProgress] = useState(0)
  const analysis = sampleRepoAnalysis

  function handleAnalyze() {
    if (!input.trim()) {
      setInput(samplePackageJson)
      return
    }
    setState('analyzing')
    setProgress(0)

    const steps = [10, 25, 40, 55, 70, 85, 95, 100]
    steps.forEach((p, i) => {
      setTimeout(() => {
        setProgress(p)
        if (p === 100) {
          setTimeout(() => setState('done'), 300)
        }
      }, (i + 1) * 400)
    })
  }

  return (
    <div className="upload-page">
      <div className="page-header">
        <h1>Repo Analysis</h1>
        <p>Paste your package.json, file tree, or any dependency manifest to get started.</p>
      </div>

      <div className="upload-grid">
        {/* Input panel */}
        <div className="card upload-input">
          <div className="upload-input__header">
            <h3>Codebase Input</h3>
            <button
              className="btn btn--ghost"
              onClick={() => setInput(samplePackageJson)}
            >
              Load Demo
            </button>
          </div>
          <textarea
            className="upload-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your package.json, requirements.txt, pom.xml, or file tree here..."
            rows={18}
          />
          <button
            className="btn btn--primary upload-btn"
            onClick={handleAnalyze}
            disabled={state === 'analyzing'}
          >
            {state === 'analyzing' ? 'Analyzing...' : 'Analyze Codebase'}
          </button>
        </div>

        {/* Results panel */}
        <div className="upload-results">
          {state === 'analyzing' && (
            <div className="card analysis-progress">
              <h3>Analyzing codebase...</h3>
              <div className="progress-bar" style={{ height: 10, marginTop: 16 }}>
                <div
                  className="progress-bar__fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="analysis-steps">
                <AnalysisStep label="Parsing files" done={progress >= 25} active={progress < 25} />
                <AnalysisStep label="Detecting frameworks" done={progress >= 50} active={progress >= 25 && progress < 50} />
                <AnalysisStep label="Extracting dependencies" done={progress >= 75} active={progress >= 50 && progress < 75} />
                <AnalysisStep label="Computing risk scores" done={progress >= 100} active={progress >= 75 && progress < 100} />
              </div>
            </div>
          )}

          {state === 'done' && (
            <>
              <div className="card">
                <h3 className="result-title">{analysis.name}</h3>
                <div className="result-stats">
                  <StatItem label="Files" value={analysis.totalFiles.toLocaleString()} />
                  <StatItem label="Lines of Code" value={analysis.totalLoc.toLocaleString()} />
                  <StatItem label="Dependencies" value={String(analysis.dependencies)} />
                  <StatItem label="Dev Dependencies" value={String(analysis.devDependencies)} />
                </div>
              </div>

              <div className="card">
                <h3>Language Breakdown</h3>
                <div className="lang-bars">
                  {analysis.languages.map((lang) => (
                    <div key={lang.name} className="lang-row">
                      <div className="lang-row__label">
                        <span className="lang-dot" style={{ background: lang.color }} />
                        {lang.name}
                      </div>
                      <div className="lang-row__bar">
                        <div className="progress-bar">
                          <div
                            className="progress-bar__fill"
                            style={{ width: `${lang.percentage}%`, background: lang.color }}
                          />
                        </div>
                      </div>
                      <div className="lang-row__pct">{lang.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3>Detected Frameworks</h3>
                <div className="fw-tags">
                  {analysis.frameworks.map((fw) => (
                    <span key={fw} className="fw-tag">{fw}</span>
                  ))}
                  <span className="fw-tag fw-tag--muted">Build: {analysis.buildSystem}</span>
                </div>
              </div>
            </>
          )}

          {state === 'idle' && (
            <div className="card upload-empty">
              <div className="upload-empty__icon">&#128269;</div>
              <h3>No analysis yet</h3>
              <p>Paste your dependency manifest and click "Analyze Codebase" to see results, or click "Load Demo" for a sample.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AnalysisStep({ label, done, active }: { label: string; done: boolean; active: boolean }) {
  return (
    <div className={`analysis-step ${done ? 'analysis-step--done' : ''} ${active ? 'analysis-step--active' : ''}`}>
      <span className="analysis-step__icon">{done ? '\u2713' : active ? '\u25CB' : '\u2015'}</span>
      {label}
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-item">
      <div className="stat-item__value">{value}</div>
      <div className="stat-item__label">{label}</div>
    </div>
  )
}
