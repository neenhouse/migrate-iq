import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MigrationPlanPage from './MigrationPlanPage'

describe('MigrationPlanPage', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <MigrationPlanPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Migration Plan')).toBeInTheDocument()
  })

  it('renders summary statistics', () => {
    render(
      <MemoryRouter>
        <MigrationPlanPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Total Effort')).toBeInTheDocument()
    expect(screen.getByText('Story Points')).toBeInTheDocument()
    expect(screen.getByText('Breaking Changes')).toBeInTheDocument()
    expect(screen.getByText('Overall Progress')).toBeInTheDocument()
  })

  it('renders phase headers', () => {
    render(
      <MemoryRouter>
        <MigrationPlanPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/Phase 1: Foundation/)).toBeInTheDocument()
    expect(screen.getByText(/Phase 2: Data Layer/)).toBeInTheDocument()
    expect(screen.getByText(/Phase 3: UI & State/)).toBeInTheDocument()
  })

  it('renders module names in the table', () => {
    render(
      <MemoryRouter>
        <MigrationPlanPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/Build System/)).toBeInTheDocument()
    expect(screen.getByText(/UI Components/)).toBeInTheDocument()
    expect(screen.getByText(/API Layer/)).toBeInTheDocument()
  })

  it('renders confidence intervals section', () => {
    render(
      <MemoryRouter>
        <MigrationPlanPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Confidence Intervals')).toBeInTheDocument()
  })
})
