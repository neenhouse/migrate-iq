import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DashboardPage from './DashboardPage'

describe('DashboardPage', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Progress Dashboard')).toBeInTheDocument()
  })

  it('renders overall progress stat', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Overall Progress')).toBeInTheDocument()
  })

  it('renders module progress section', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Module Progress')).toBeInTheDocument()
  })

  it('renders status breakdown', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Status Breakdown')).toBeInTheDocument()
  })

  it('renders alerts section', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Alerts')).toBeInTheDocument()
    expect(screen.getByText('Auth Module blocked')).toBeInTheDocument()
  })
})
