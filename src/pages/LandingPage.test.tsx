import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders the hero headline', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/Make legacy migration/i)).toBeInTheDocument()
    expect(screen.getByText('safe')).toBeInTheDocument()
    expect(screen.getByText(/predictable/i)).toBeInTheDocument()
  })

  it('renders the upload CTA button', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    )
    const ctaButtons = screen.getAllByText(/Upload Your Repo/i)
    expect(ctaButtons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders all 7 feature cards', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Repo Analysis')).toBeInTheDocument()
    expect(screen.getByText('Dependency Graph')).toBeInTheDocument()
    expect(screen.getByText('Breaking Changes')).toBeInTheDocument()
    expect(screen.getByText('Migration Plan')).toBeInTheDocument()
    expect(screen.getByText('Script Templates')).toBeInTheDocument()
    expect(screen.getByText('Progress Tracking')).toBeInTheDocument()
    expect(screen.getByText('Rollback Planning')).toBeInTheDocument()
  })

  it('renders problem/solution section', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Without MigrateIQ')).toBeInTheDocument()
    expect(screen.getByText('With MigrateIQ')).toBeInTheDocument()
  })

  it('renders stats section', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    )
    expect(screen.getByText('10x')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
  })
})
