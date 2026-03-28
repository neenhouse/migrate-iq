import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import RollbackPage from './RollbackPage'

describe('RollbackPage', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <RollbackPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Rollback Planning')).toBeInTheDocument()
  })

  it('renders rollback steps with checkboxes', () => {
    render(
      <MemoryRouter>
        <RollbackPage />
      </MemoryRouter>
    )
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThanOrEqual(5)
  })

  it('renders rollback triggers section', () => {
    render(
      <MemoryRouter>
        <RollbackPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Rollback Triggers')).toBeInTheDocument()
  })

  it('toggles checkbox on click', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <RollbackPage />
      </MemoryRouter>
    )
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).not.toBeChecked()
    await user.click(checkboxes[0])
    expect(checkboxes[0]).toBeChecked()
  })

  it('shows dependency warnings', () => {
    render(
      <MemoryRouter>
        <RollbackPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/Reverting data models will break/)).toBeInTheDocument()
  })
})
