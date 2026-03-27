# MigrateIQ — Product Requirements Document

## Overview

MigrateIQ is a legacy codebase migration intelligence platform. Users upload a repository and receive a complete migration plan with dependency graphs, risk scores, breaking change detection, effort estimation, auto-generated migration scripts, progress tracking, and rollback planning.

---

## Feature 1: Landing Page

### Description

A marketing and onboarding page that communicates the value proposition of MigrateIQ and funnels users to the upload flow.

### Requirements

- Hero section with tagline: "Make legacy migration safe and predictable"
- Problem/solution narrative explaining why migrations fail and how MigrateIQ helps
- Feature highlights with icons for each of the 7 core capabilities
- Social proof section (testimonials, case study summaries, or metrics)
- Call-to-action: "Upload Your Repo" button leading to the upload flow
- Responsive design (mobile, tablet, desktop)
- Fast load time (< 2s LCP)

### Success Metrics

- Conversion rate from landing page to upload flow > 15%
- Bounce rate < 50%

---

## Feature 2: Repo/Codebase Upload + Analysis

### Description

Users upload a repository (via Git URL, ZIP, or direct GitHub integration) and the platform performs static analysis to build an internal model of the codebase.

### Requirements

- Support input methods: Git URL (public/private with token), ZIP upload, GitHub OAuth integration
- Parse and index all source files, configuration files, and dependency manifests
- Detect primary language(s), framework(s), and build system(s)
- Extract dependency tree (direct and transitive) from package manifests (package.json, requirements.txt, pom.xml, go.mod, etc.)
- Identify code patterns: component structures, API boundaries, data models, test coverage
- Generate a codebase summary: file count, LOC, language breakdown, framework versions
- Display real-time progress during analysis (WebSocket or SSE)
- Handle repos up to 500MB / 100k files
- Analysis completes within 5 minutes for a typical 50k LOC repo

### Success Metrics

- Analysis success rate > 95% across supported languages
- Median analysis time < 2 minutes for repos under 50k LOC

---

## Feature 3: Dependency Graph with Risk Scoring

### Description

An interactive, visual dependency graph that maps all internal and external dependencies and assigns a risk score to each node based on migration complexity factors.

### Requirements

- Render interactive dependency graph (zoom, pan, filter, search)
- Node types: modules/packages, external dependencies, internal modules, configuration files
- Edge types: import/require, runtime dependency, build dependency, peer dependency
- Risk scoring per node (0-100) based on:
  - Number of dependents (fan-in)
  - Dependency depth (fan-out)
  - API surface area (exported functions, classes, types)
  - Test coverage of the module
  - Known migration complexity for the dependency (community data)
  - Version staleness (how far behind latest)
- Color-coded risk visualization (green/yellow/orange/red)
- Click a node to see detailed risk breakdown and affected files
- Export graph as SVG or PNG
- Filter by risk level, module type, or dependency depth

### Success Metrics

- Users interact with the graph (zoom, click, filter) in > 80% of sessions
- Risk scores correlate with actual migration difficulty (validated post-migration)

---

## Feature 4: Breaking Change Detector

### Description

Automatically detect breaking changes that will occur during migration by comparing current usage patterns against target framework/library APIs.

### Requirements

- User selects migration target (e.g., React 18 to React 19, Express to Fastify, jQuery to vanilla JS)
- Scan codebase for usage of deprecated or removed APIs in the target version
- Detect type signature changes that will cause compilation errors
- Identify behavioral changes that may not cause errors but change runtime behavior
- Categorize findings by severity: Critical (will not compile), High (runtime error likely), Medium (behavioral change), Low (deprecation warning)
- For each breaking change, show:
  - Affected file(s) and line number(s)
  - Current usage pattern
  - Required change
  - Automated fix availability (yes/no)
- Support custom rule definitions for internal framework migrations
- Re-run detection incrementally as migration progresses

### Success Metrics

- Detection precision > 90% (flagged items are actual breaking changes)
- Detection recall > 85% (catches most real breaking changes)

---

## Feature 5: Migration Plan Generator (Effort Estimation)

### Description

Generate a comprehensive, ordered migration plan with effort estimates for each module, phase, and the overall project.

### Requirements

- Produce a phased migration plan with recommended execution order
- Each phase contains a set of modules/components to migrate together
- Ordering respects dependency graph (migrate leaves first, roots last)
- Effort estimation per module based on:
  - Lines of code affected
  - Number of breaking changes
  - Risk score
  - Test coverage (lower coverage = more manual testing effort)
  - Pattern complexity (simple rename vs. architectural change)
- Effort units: story points, developer-hours, and developer-weeks
- Confidence intervals on estimates (e.g., "3-5 developer-weeks, 80% confidence")
- Identify parallelizable work (modules that can be migrated concurrently)
- Generate critical path analysis
- Allow manual adjustment of estimates and plan reordering
- Export plan as Markdown, CSV, or JSON
- Integration with project management tools (Jira, Linear) for plan import

### Success Metrics

- Effort estimates within 30% of actual for > 70% of modules
- Users export or integrate the plan in > 60% of sessions

---

## Feature 6: Migration Script Templates

### Description

Auto-generate migration scripts for common, well-known migration patterns. Scripts transform code automatically with human review before application.

### Requirements

- Built-in templates for common migrations:
  - jQuery to React
  - REST to GraphQL
  - Class components to functional components (React)
  - JavaScript to TypeScript
  - CommonJS to ES Modules
  - Express to Fastify/Hono
  - Webpack to Vite
  - CSS to CSS Modules / Tailwind
  - Redux to Zustand / React Context
  - Moment.js to date-fns / Temporal
- Each template produces:
  - A diff preview showing before/after for each affected file
  - A runnable script (codemod) that can be applied via CLI
  - A list of manual steps that cannot be automated
- Allow users to customize templates (regex patterns, output format)
- Support user-contributed templates (upload and share)
- Dry-run mode: show what would change without applying
- Apply scripts incrementally (one module at a time)

### Success Metrics

- Auto-generated scripts handle > 70% of changes for supported migration types
- Users apply at least one script template in > 50% of sessions

---

## Feature 7: Progress Tracking Dashboard

### Description

A real-time dashboard that tracks migration progress at the module, phase, and project level.

### Requirements

- Overall progress: percentage of modules migrated, tests passing, breaking changes resolved
- Phase-level view: status of each phase (not started, in progress, complete, blocked)
- Module-level view: migration status, test results, open issues
- Burndown chart: estimated remaining effort over time
- Velocity tracking: modules migrated per sprint/week
- Regression alerts: notify when a previously migrated module breaks (e.g., new test failures)
- Comparison view: planned vs. actual effort per module
- Team view: progress by assignee (if integrated with project management tool)
- Filterable by phase, risk level, assignee, status
- Auto-refresh via WebSocket or polling

### Success Metrics

- Dashboard viewed at least 3x per week by active migration teams
- Regression alerts catch > 90% of regressions within 1 hour

---

## Feature 8: Rollback Planning

### Description

Every migration plan includes a rollback strategy that allows teams to safely revert any phase or module migration if issues arise.

### Requirements

- Auto-generate rollback plan alongside the migration plan
- Per-phase rollback: revert all changes in a phase as a unit
- Per-module rollback: revert a single module independently
- Rollback scripts: auto-generated reverse transforms for script-based migrations
- Dependency-aware rollback: warn if rolling back a module will break downstream migrated modules
- Rollback testing: validate that rollback scripts produce the original code (diff check)
- Rollback triggers: define conditions that should trigger a rollback (e.g., test failure rate > 10%, error rate spike)
- Rollback history: track which rollbacks have been executed and when
- Integration with CI/CD: trigger rollback from pipeline on failure
- Time-to-rollback metric: estimate how long a rollback will take per phase

### Success Metrics

- Rollback scripts successfully revert > 95% of automated changes
- Time-to-rollback < 30 minutes for any single phase

---

## Technical Constraints

- Frontend: React 19, TypeScript, Vite, deployed to Cloudflare Pages
- Backend: Cloudflare Workers for API, analysis jobs may use queued workers or external compute
- Storage: R2 for uploaded repos, D1 or KV for metadata
- Auth: GitHub OAuth for repo access, optional email/password
- File size limit: 500MB per upload
- Supported languages (initial): JavaScript/TypeScript, Python, Java, Go
- All analysis runs server-side; no code leaves the platform without user consent

## Non-Functional Requirements

- Page load time < 2 seconds (LCP)
- Analysis pipeline handles 100 concurrent jobs
- 99.9% uptime for the web application
- SOC 2 Type II compliance roadmap (user code is sensitive)
- WCAG 2.1 AA accessibility compliance
