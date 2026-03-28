import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import UploadPage from './UploadPage'

describe('UploadPage', () => {
  it('renders the page title and description', () => {
    render(
      <MemoryRouter>
        <UploadPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Repo Analysis')).toBeInTheDocument()
    expect(screen.getByText(/Paste your package.json/)).toBeInTheDocument()
  })

  it('renders the textarea and analyze button', () => {
    render(
      <MemoryRouter>
        <UploadPage />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText(/package\.json/i)).toBeInTheDocument()
    expect(screen.getByText('Analyze Codebase')).toBeInTheDocument()
  })

  it('renders the Load Demo button', () => {
    render(
      <MemoryRouter>
        <UploadPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Load Demo')).toBeInTheDocument()
  })

  it('loads sample data when Load Demo is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <UploadPage />
      </MemoryRouter>
    )
    await user.click(screen.getByText('Load Demo'))
    const textarea = screen.getByPlaceholderText(/package\.json/i) as HTMLTextAreaElement
    expect(textarea.value).toContain('acme-web-platform')
  })

  it('shows empty state initially', () => {
    render(
      <MemoryRouter>
        <UploadPage />
      </MemoryRouter>
    )
    expect(screen.getByText('No analysis yet')).toBeInTheDocument()
  })
})
