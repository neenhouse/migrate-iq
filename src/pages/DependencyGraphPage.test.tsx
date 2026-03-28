import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DependencyGraphPage from './DependencyGraphPage'

describe('DependencyGraphPage', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <DependencyGraphPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Dependency Graph')).toBeInTheDocument()
  })

  it('renders risk filter buttons', () => {
    render(
      <MemoryRouter>
        <DependencyGraphPage />
      </MemoryRouter>
    )
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('High')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('Low')).toBeInTheDocument()
  })

  it('renders the SVG graph element', () => {
    render(
      <MemoryRouter>
        <DependencyGraphPage />
      </MemoryRouter>
    )
    const svg = screen.getByRole('img', { name: /dependency graph/i })
    expect(svg).toBeInTheDocument()
  })

  it('shows empty detail panel initially', () => {
    render(
      <MemoryRouter>
        <DependencyGraphPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Click a node in the graph to view details')).toBeInTheDocument()
  })

  it('renders risk legend', () => {
    render(
      <MemoryRouter>
        <DependencyGraphPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/High \(75\+\)/)).toBeInTheDocument()
    expect(screen.getByText(/Safe \(0-24\)/)).toBeInTheDocument()
  })
})
