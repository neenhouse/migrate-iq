import type { ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import './Layout.css'

const dashboardItems = [
  { to: '/upload', label: 'Repo Upload', icon: 'upload' },
  { to: '/dependencies', label: 'Dependencies', icon: 'graph' },
  { to: '/breaking-changes', label: 'Breaking Changes', icon: 'alert' },
  { to: '/migration-plan', label: 'Migration Plan', icon: 'plan' },
  { to: '/scripts', label: 'Scripts', icon: 'code' },
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/rollback', label: 'Rollback', icon: 'rollback' },
]

const iconPaths: Record<string, ReactNode> = {
  upload: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  graph: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><line x1="8.59" y1="7.41" x2="15.42" y2="14.59" /><line x1="15.41" y1="7.41" x2="15.41" y2="7.41" /><path d="M18 9v6" />
    </svg>
  ),
  alert: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  plan: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  code: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  rollback: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
}

export default function Layout() {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const isDashboard = !isLanding

  return (
    <div className={`layout ${isDashboard ? 'layout--dashboard' : ''}`}>
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar__inner">
          <NavLink to="/" className="topbar__brand">
            <span className="topbar__logo">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <path d="M8 22L14 10l4 6 4-6v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 16l2-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="topbar__name">MigrateIQ</span>
          </NavLink>

          {/* Landing-only top nav */}
          {isLanding && (
            <nav className="topbar__nav">
              <a href="#features" className="topbar__link">Features</a>
              <a href="#how-it-works" className="topbar__link">How it Works</a>
              <NavLink to="/upload" className="btn btn--primary topbar__cta">Get Started</NavLink>
            </nav>
          )}

          {/* Dashboard top bar with project label */}
          {isDashboard && (
            <div className="topbar__project">
              <span className="topbar__project-dot" />
              <span className="topbar__project-name">acme-web-platform</span>
            </div>
          )}
        </div>
      </header>

      <div className="layout__body">
        {/* Sidebar for dashboard pages */}
        {isDashboard && (
          <aside className="sidebar">
            <nav className="sidebar__nav">
              {dashboardItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                >
                  <span className="sidebar__icon">{iconPaths[item.icon]}</span>
                  <span className="sidebar__label">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        )}

        <main className={`layout__main ${isDashboard ? 'layout__main--dashboard' : ''}`}>
          <Outlet />
        </main>
      </div>

      <footer className="layout__footer">
        <div className="container">
          <p>&copy; 2026 MigrateIQ. Make legacy migration safe and predictable.</p>
        </div>
      </footer>
    </div>
  )
}
