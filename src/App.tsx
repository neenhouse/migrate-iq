import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/ui/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const UploadPage = lazy(() => import('./pages/UploadPage'))
const DependencyGraphPage = lazy(() => import('./pages/DependencyGraphPage'))
const BreakingChangesPage = lazy(() => import('./pages/BreakingChangesPage'))
const MigrationPlanPage = lazy(() => import('./pages/MigrationPlanPage'))
const ScriptsPage = lazy(() => import('./pages/ScriptsPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const RollbackPage = lazy(() => import('./pages/RollbackPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function LoadingFallback() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ color: 'var(--accent)', fontSize: '1.125rem' }}>Loading...</div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="dependencies" element={<DependencyGraphPage />} />
              <Route path="breaking-changes" element={<BreakingChangesPage />} />
              <Route path="migration-plan" element={<MigrationPlanPage />} />
              <Route path="scripts" element={<ScriptsPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="rollback" element={<RollbackPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
