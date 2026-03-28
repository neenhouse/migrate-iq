import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ScriptsPage from './ScriptsPage'

describe('ScriptsPage', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <ScriptsPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Migration Script Templates')).toBeInTheDocument()
  })

  it('renders all template tabs', () => {
    render(
      <MemoryRouter>
        <ScriptsPage />
      </MemoryRouter>
    )
    // jQuery appears in tab and badge, so use getAllByText
    expect(screen.getAllByText('jQuery').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('REST API').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Monolith').length).toBeGreaterThanOrEqual(1)
  })

  it('renders before/after code sections', () => {
    render(
      <MemoryRouter>
        <ScriptsPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Before')).toBeInTheDocument()
    expect(screen.getByText('After')).toBeInTheDocument()
  })

  it('renders manual steps section', () => {
    render(
      <MemoryRouter>
        <ScriptsPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Manual Steps Required')).toBeInTheDocument()
  })

  it('switches template when tab is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ScriptsPage />
      </MemoryRouter>
    )
    // Click the REST to GraphQL tab
    const restTab = screen.getByText('REST API').closest('button')!
    await user.click(restTab)
    expect(screen.getByText('REST to GraphQL')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(
      <MemoryRouter>
        <ScriptsPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Apply Script (Dry Run)')).toBeInTheDocument()
    expect(screen.getByText('Download Codemod')).toBeInTheDocument()
  })
})
