import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload' },
  { to: '/dependencies', label: 'Dependencies' },
  { to: '/breaking-changes', label: 'Breaking Changes' },
  { to: '/migration-plan', label: 'Migration Plan' },
  { to: '/scripts', label: 'Scripts' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/rollback', label: 'Rollback' },
]

export default function Layout() {
  return (
    <div className="layout">
      <header className="topbar">
        <div className="topbar__inner container">
          <NavLink to="/" className="topbar__brand">
            <span className="topbar__logo">M</span>
            <span className="topbar__name">MigrateIQ</span>
          </NavLink>
          <nav className="topbar__nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `topbar__link ${isActive ? 'topbar__link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        <div className="container">
          <p>&copy; 2026 MigrateIQ. Make legacy migration safe and predictable.</p>
        </div>
      </footer>
    </div>
  )
}
