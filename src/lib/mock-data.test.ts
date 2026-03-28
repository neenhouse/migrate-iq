import { describe, it, expect } from 'vitest'
import {
  dependencyNodes,
  dependencyEdges,
  breakingChanges,
  migrationModules,
  rollbackSteps,
  scriptTemplates,
  getRiskColor,
  getRiskLabel,
  getSeverityColor,
} from './mock-data'

describe('mock-data', () => {
  it('has dependency nodes with valid risk scores (0-100)', () => {
    dependencyNodes.forEach((node) => {
      expect(node.risk).toBeGreaterThanOrEqual(0)
      expect(node.risk).toBeLessThanOrEqual(100)
    })
  })

  it('has dependency edges referencing existing node IDs', () => {
    const nodeIds = new Set(dependencyNodes.map((n) => n.id))
    dependencyEdges.forEach((edge) => {
      expect(nodeIds.has(edge.source)).toBe(true)
      expect(nodeIds.has(edge.target)).toBe(true)
    })
  })

  it('has breaking changes with valid severity levels', () => {
    const validSeverities = ['critical', 'high', 'medium', 'low']
    breakingChanges.forEach((bc) => {
      expect(validSeverities).toContain(bc.severity)
    })
  })

  it('has migration modules with progress between 0 and 100', () => {
    migrationModules.forEach((mod) => {
      expect(mod.progress).toBeGreaterThanOrEqual(0)
      expect(mod.progress).toBeLessThanOrEqual(100)
    })
  })

  it('has rollback steps for multiple phases', () => {
    const phases = new Set(rollbackSteps.map((s) => s.phase))
    expect(phases.size).toBeGreaterThanOrEqual(3)
  })

  it('has script templates with before and after code', () => {
    scriptTemplates.forEach((tpl) => {
      expect(tpl.beforeCode.length).toBeGreaterThan(0)
      expect(tpl.afterCode.length).toBeGreaterThan(0)
      expect(tpl.manualSteps.length).toBeGreaterThan(0)
    })
  })
})

describe('getRiskColor', () => {
  it('returns red for high risk (>= 75)', () => {
    expect(getRiskColor(75)).toBe('#ef4444')
    expect(getRiskColor(100)).toBe('#ef4444')
  })

  it('returns amber for medium risk (50-74)', () => {
    expect(getRiskColor(50)).toBe('#f59e0b')
    expect(getRiskColor(74)).toBe('#f59e0b')
  })

  it('returns teal for low risk (25-49)', () => {
    expect(getRiskColor(25)).toBe('#14b8a6')
    expect(getRiskColor(49)).toBe('#14b8a6')
  })

  it('returns green for safe risk (< 25)', () => {
    expect(getRiskColor(0)).toBe('#22c55e')
    expect(getRiskColor(24)).toBe('#22c55e')
  })
})

describe('getRiskLabel', () => {
  it('returns correct labels for each range', () => {
    expect(getRiskLabel(80)).toBe('High')
    expect(getRiskLabel(60)).toBe('Medium')
    expect(getRiskLabel(30)).toBe('Low')
    expect(getRiskLabel(10)).toBe('Safe')
  })
})

describe('getSeverityColor', () => {
  it('returns correct colors for each severity', () => {
    expect(getSeverityColor('critical')).toBe('#ef4444')
    expect(getSeverityColor('high')).toBe('#f59e0b')
    expect(getSeverityColor('medium')).toBe('#14b8a6')
    expect(getSeverityColor('low')).toBe('#6b7280')
  })
})
