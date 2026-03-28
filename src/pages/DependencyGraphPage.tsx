import { useState, useMemo } from 'react'
import { dependencyNodes, dependencyEdges, getRiskColor, getRiskLabel } from '../lib/mock-data'
import type { DependencyNode } from '../lib/mock-data'
import './DependencyGraphPage.css'

interface NodePosition {
  x: number
  y: number
  node: DependencyNode
}

export default function DependencyGraphPage() {
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(null)
  const [filterRisk, setFilterRisk] = useState<string>('all')

  const filteredNodes = useMemo(() => {
    if (filterRisk === 'all') return dependencyNodes
    return dependencyNodes.filter((n) => {
      if (filterRisk === 'high') return n.risk >= 75
      if (filterRisk === 'medium') return n.risk >= 50 && n.risk < 75
      if (filterRisk === 'low') return n.risk < 50
      return true
    })
  }, [filterRisk])

  const filteredIds = new Set(filteredNodes.map((n) => n.id))

  // Layout: internal nodes on left, external on right
  const positions = useMemo<NodePosition[]>(() => {
    const internal = filteredNodes.filter((n) => n.type === 'internal')
    const external = filteredNodes.filter((n) => n.type === 'external')

    const result: NodePosition[] = []

    internal.forEach((node, i) => {
      result.push({
        x: 180,
        y: 80 + i * 100,
        node,
      })
    })

    external.forEach((node, i) => {
      result.push({
        x: 620,
        y: 40 + i * 70,
        node,
      })
    })

    return result
  }, [filteredNodes])

  const posMap = new Map(positions.map((p) => [p.node.id, p]))

  const visibleEdges = dependencyEdges.filter(
    (e) => filteredIds.has(e.source) && filteredIds.has(e.target)
  )

  const svgHeight = Math.max(
    ...positions.map((p) => p.y + 60),
    400
  )

  return (
    <div className="dep-page">
      <div className="page-header">
        <h1>Dependency Graph</h1>
        <p>Interactive dependency map with risk scoring per node.</p>
      </div>

      <div className="dep-toolbar">
        <div className="dep-filters">
          <span className="dep-filter-label">Filter by risk:</span>
          {['all', 'high', 'medium', 'low'].map((f) => (
            <button
              key={f}
              className={`btn btn--ghost dep-filter-btn ${filterRisk === f ? 'dep-filter-btn--active' : ''}`}
              onClick={() => setFilterRisk(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="dep-legend">
          <span className="dep-legend__item"><span className="dep-dot" style={{ background: '#ef4444' }} /> High (75+)</span>
          <span className="dep-legend__item"><span className="dep-dot" style={{ background: '#f59e0b' }} /> Medium (50-74)</span>
          <span className="dep-legend__item"><span className="dep-dot" style={{ background: '#14b8a6' }} /> Low (25-49)</span>
          <span className="dep-legend__item"><span className="dep-dot" style={{ background: '#22c55e' }} /> Safe (0-24)</span>
        </div>
      </div>

      <div className="dep-layout">
        <div className="dep-graph card">
          <svg
            viewBox={`0 0 820 ${svgHeight}`}
            className="dep-svg"
            role="img"
            aria-label="Dependency graph showing modules and their risk levels"
          >
            {/* Edges */}
            {visibleEdges.map((edge) => {
              const src = posMap.get(edge.source)
              const tgt = posMap.get(edge.target)
              if (!src || !tgt) return null
              return (
                <line
                  key={`${edge.source}-${edge.target}`}
                  x1={src.x + 80}
                  y1={src.y + 20}
                  x2={tgt.x - 20}
                  y2={tgt.y + 20}
                  stroke="var(--border-light)"
                  strokeWidth={1.5}
                  strokeDasharray={src.node.type === 'internal' && tgt.node.type === 'internal' ? 'none' : '6 3'}
                />
              )
            })}

            {/* Nodes */}
            {positions.map(({ x, y, node }) => {
              const riskColor = getRiskColor(node.risk)
              const isSelected = selectedNode?.id === node.id
              return (
                <g
                  key={node.id}
                  className="dep-node"
                  onClick={() => setSelectedNode(isSelected ? null : node)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={x - 20}
                    y={y}
                    width={node.type === 'internal' ? 180 : 160}
                    height={40}
                    rx={8}
                    fill={isSelected ? 'var(--accent-bg)' : 'var(--bg-secondary)'}
                    stroke={isSelected ? 'var(--accent)' : riskColor}
                    strokeWidth={isSelected ? 2 : 1.5}
                  />
                  {/* Risk indicator circle */}
                  <circle
                    cx={x - 6}
                    cy={y + 20}
                    r={6}
                    fill={riskColor}
                  />
                  <text
                    x={x + 10}
                    y={y + 24}
                    fill="var(--text-primary)"
                    fontSize={12}
                    fontFamily="var(--font-sans)"
                    fontWeight={500}
                  >
                    {node.label.length > 18 ? node.label.slice(0, 18) + '...' : node.label}
                  </text>
                  {/* Risk score */}
                  <text
                    x={x + (node.type === 'internal' ? 140 : 120)}
                    y={y + 25}
                    fill={riskColor}
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    fontWeight={700}
                    textAnchor="end"
                  >
                    {node.risk}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="dep-detail card">
          {selectedNode ? (
            <>
              <h3>{selectedNode.label}</h3>
              <div className="dep-detail__type">
                <span className={`badge badge--${selectedNode.risk >= 75 ? 'critical' : selectedNode.risk >= 50 ? 'high' : selectedNode.risk >= 25 ? 'medium' : 'low'}`}>
                  {getRiskLabel(selectedNode.risk)} Risk
                </span>
                <span className="dep-detail__type-label">{selectedNode.type}</span>
              </div>

              <div className="dep-detail__score">
                <div className="dep-detail__score-num" style={{ color: getRiskColor(selectedNode.risk) }}>
                  {selectedNode.risk}
                </div>
                <div className="dep-detail__score-label">Risk Score</div>
              </div>

              <div className="dep-detail__grid">
                <DetailRow label="Dependents" value={String(selectedNode.dependents)} />
                <DetailRow label="Dependencies" value={String(selectedNode.dependencies.length)} />
                {selectedNode.type === 'internal' && (
                  <>
                    <DetailRow label="Lines of Code" value={selectedNode.loc.toLocaleString()} />
                    <DetailRow label="Test Coverage" value={`${selectedNode.testCoverage}%`} />
                  </>
                )}
                {selectedNode.version && (
                  <>
                    <DetailRow label="Current" value={selectedNode.version} />
                    <DetailRow label="Latest" value={selectedNode.latestVersion ?? '-'} />
                  </>
                )}
              </div>

              {selectedNode.dependencies.length > 0 && (
                <div className="dep-detail__deps">
                  <h4>Dependencies</h4>
                  <div className="dep-detail__tags">
                    {selectedNode.dependencies.map((d) => (
                      <span key={d} className="dep-detail__tag">{d}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="dep-detail__empty">
              <p>Click a node in the graph to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="dep-detail__row">
      <span className="dep-detail__row-label">{label}</span>
      <span className="dep-detail__row-value">{value}</span>
    </div>
  )
}
