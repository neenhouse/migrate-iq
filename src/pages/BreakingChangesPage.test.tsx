import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BreakingChangesPage from './BreakingChangesPage'

describe('BreakingChangesPage', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <BreakingChangesPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Breaking Change Detector')).toBeInTheDocument()
  })

  it('renders severity filter buttons', () => {
    render(
      <MemoryRouter>
        <BreakingChangesPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/Critical/)).toBeInTheDocument()
    expect(screen.getByText(/High/)).toBeInTheDocument()
    expect(screen.getByText(/Medium/)).toBeInTheDocument()
    expect(screen.getByText(/Low/)).toBeInTheDocument()
  })

  it('renders breaking change items', () => {
    render(
      <MemoryRouter>
        <BreakingChangesPage />
      </MemoryRouter>
    )
    // Check that at least one file reference is shown
    expect(screen.getByText(/UserList\.jsx/)).toBeInTheDocument()
  })
})
