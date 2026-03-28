// ── Mock data for MigrateIQ demo ──

export interface DependencyNode {
  id: string
  label: string
  type: 'internal' | 'external'
  risk: number // 0-100
  version?: string
  latestVersion?: string
  dependents: number
  dependencies: string[]
  loc: number
  testCoverage: number
}

export interface BreakingChange {
  id: string
  file: string
  line: number
  severity: 'critical' | 'high' | 'medium' | 'low'
  currentPattern: string
  requiredChange: string
  description: string
  autoFixAvailable: boolean
}

export interface MigrationModule {
  id: string
  name: string
  phase: number
  status: 'not-started' | 'in-progress' | 'complete' | 'blocked'
  effortHours: number
  effortPoints: number
  breakingChanges: number
  riskScore: number
  loc: number
  testCoverage: number
  assignee?: string
  progress: number
}

export interface RollbackStep {
  id: string
  phase: number
  module: string
  action: string
  command?: string
  estimatedMinutes: number
  checked: boolean
  dependencyWarning?: string
}

export interface ScriptTemplate {
  id: string
  name: string
  from: string
  to: string
  description: string
  beforeCode: string
  afterCode: string
  manualSteps: string[]
}

export interface RepoAnalysis {
  name: string
  totalFiles: number
  totalLoc: number
  languages: { name: string; percentage: number; color: string }[]
  frameworks: string[]
  buildSystem: string
  dependencies: number
  devDependencies: number
}

// ── Dependency graph nodes ──

export const dependencyNodes: DependencyNode[] = [
  {
    id: 'app-core',
    label: 'app-core',
    type: 'internal',
    risk: 85,
    dependents: 12,
    dependencies: ['react', 'lodash', 'axios'],
    loc: 4200,
    testCoverage: 45,
  },
  {
    id: 'auth-module',
    label: 'auth-module',
    type: 'internal',
    risk: 72,
    dependents: 8,
    dependencies: ['app-core', 'jsonwebtoken', 'bcrypt'],
    loc: 1800,
    testCoverage: 62,
  },
  {
    id: 'api-layer',
    label: 'api-layer',
    type: 'internal',
    risk: 68,
    dependents: 6,
    dependencies: ['app-core', 'express', 'cors'],
    loc: 3100,
    testCoverage: 55,
  },
  {
    id: 'ui-components',
    label: 'ui-components',
    type: 'internal',
    risk: 45,
    dependents: 15,
    dependencies: ['react', 'jquery', 'moment'],
    loc: 5600,
    testCoverage: 78,
  },
  {
    id: 'data-models',
    label: 'data-models',
    type: 'internal',
    risk: 55,
    dependents: 10,
    dependencies: ['mongoose', 'lodash'],
    loc: 2400,
    testCoverage: 70,
  },
  {
    id: 'react',
    label: 'react@16.14.0',
    type: 'external',
    risk: 60,
    version: '16.14.0',
    latestVersion: '19.2.0',
    dependents: 20,
    dependencies: [],
    loc: 0,
    testCoverage: 0,
  },
  {
    id: 'jquery',
    label: 'jquery@3.5.1',
    type: 'external',
    risk: 92,
    version: '3.5.1',
    latestVersion: '4.0.0',
    dependents: 8,
    dependencies: [],
    loc: 0,
    testCoverage: 0,
  },
  {
    id: 'lodash',
    label: 'lodash@4.17.15',
    type: 'external',
    risk: 30,
    version: '4.17.15',
    latestVersion: '4.17.21',
    dependents: 5,
    dependencies: [],
    loc: 0,
    testCoverage: 0,
  },
  {
    id: 'express',
    label: 'express@4.17.1',
    type: 'external',
    risk: 50,
    version: '4.17.1',
    latestVersion: '5.1.0',
    dependents: 3,
    dependencies: [],
    loc: 0,
    testCoverage: 0,
  },
  {
    id: 'moment',
    label: 'moment@2.29.1',
    type: 'external',
    risk: 78,
    version: '2.29.1',
    latestVersion: '2.30.1',
    dependents: 6,
    dependencies: [],
    loc: 0,
    testCoverage: 0,
  },
  {
    id: 'mongoose',
    label: 'mongoose@5.13.0',
    type: 'external',
    risk: 40,
    version: '5.13.0',
    latestVersion: '8.12.0',
    dependents: 2,
    dependencies: [],
    loc: 0,
    testCoverage: 0,
  },
  {
    id: 'axios',
    label: 'axios@0.21.1',
    type: 'external',
    risk: 35,
    version: '0.21.1',
    latestVersion: '1.9.0',
    dependents: 4,
    dependencies: [],
    loc: 0,
    testCoverage: 0,
  },
  {
    id: 'jsonwebtoken',
    label: 'jsonwebtoken@8.5.1',
    type: 'external',
    risk: 25,
    version: '8.5.1',
    latestVersion: '9.0.2',
    dependents: 1,
    dependencies: [],
    loc: 0,
    testCoverage: 0,
  },
  {
    id: 'bcrypt',
    label: 'bcrypt@5.0.0',
    type: 'external',
    risk: 20,
    version: '5.0.0',
    latestVersion: '5.1.1',
    dependents: 1,
    dependencies: [],
    loc: 0,
    testCoverage: 0,
  },
  {
    id: 'cors',
    label: 'cors@2.8.5',
    type: 'external',
    risk: 15,
    version: '2.8.5',
    latestVersion: '2.8.5',
    dependents: 1,
    dependencies: [],
    loc: 0,
    testCoverage: 0,
  },
]

export const dependencyEdges: { source: string; target: string }[] = [
  { source: 'app-core', target: 'react' },
  { source: 'app-core', target: 'lodash' },
  { source: 'app-core', target: 'axios' },
  { source: 'auth-module', target: 'app-core' },
  { source: 'auth-module', target: 'jsonwebtoken' },
  { source: 'auth-module', target: 'bcrypt' },
  { source: 'api-layer', target: 'app-core' },
  { source: 'api-layer', target: 'express' },
  { source: 'api-layer', target: 'cors' },
  { source: 'ui-components', target: 'react' },
  { source: 'ui-components', target: 'jquery' },
  { source: 'ui-components', target: 'moment' },
  { source: 'data-models', target: 'mongoose' },
  { source: 'data-models', target: 'lodash' },
]

// ── Breaking changes ──

export const breakingChanges: BreakingChange[] = [
  {
    id: 'bc-1',
    file: 'src/components/UserList.jsx',
    line: 23,
    severity: 'critical',
    currentPattern: '$(document).ready(function() { ... })',
    requiredChange: 'useEffect(() => { ... }, [])',
    description: 'jQuery document.ready is not available in React. Replace with useEffect hook.',
    autoFixAvailable: true,
  },
  {
    id: 'bc-2',
    file: 'src/components/Modal.jsx',
    line: 45,
    severity: 'critical',
    currentPattern: '$.ajax({ url, success: callback })',
    requiredChange: 'fetch(url).then(res => res.json())',
    description: 'jQuery AJAX calls must be replaced with fetch API or axios.',
    autoFixAvailable: true,
  },
  {
    id: 'bc-3',
    file: 'src/utils/dates.js',
    line: 12,
    severity: 'high',
    currentPattern: "moment(date).format('YYYY-MM-DD')",
    requiredChange: "format(new Date(date), 'yyyy-MM-dd')",
    description: 'moment.js is being replaced with date-fns. All format strings need updating.',
    autoFixAvailable: true,
  },
  {
    id: 'bc-4',
    file: 'src/api/users.js',
    line: 8,
    severity: 'high',
    currentPattern: 'app.get("/api/users", (req, res) => { ... })',
    requiredChange: 'app.get("/api/users", async (req, reply) => { ... })',
    description: 'Express route handlers use (req, res), Fastify uses (req, reply) with async handlers.',
    autoFixAvailable: false,
  },
  {
    id: 'bc-5',
    file: 'src/components/App.jsx',
    line: 1,
    severity: 'medium',
    currentPattern: "import React from 'react'",
    requiredChange: "// React 19: JSX transform - import not required",
    description: 'React 19 uses the new JSX transform. Explicit React imports for JSX are no longer needed.',
    autoFixAvailable: true,
  },
  {
    id: 'bc-6',
    file: 'src/components/DataTable.jsx',
    line: 67,
    severity: 'medium',
    currentPattern: 'componentDidMount() { this.fetchData() }',
    requiredChange: 'useEffect(() => { fetchData() }, [])',
    description: 'Class component lifecycle methods must be converted to hooks.',
    autoFixAvailable: true,
  },
  {
    id: 'bc-7',
    file: 'src/middleware/auth.js',
    line: 15,
    severity: 'high',
    currentPattern: 'res.status(401).send("Unauthorized")',
    requiredChange: 'reply.code(401).send({ error: "Unauthorized" })',
    description: 'Express res.status().send() changes to Fastify reply.code().send().',
    autoFixAvailable: false,
  },
  {
    id: 'bc-8',
    file: 'src/config/webpack.config.js',
    line: 1,
    severity: 'low',
    currentPattern: "module.exports = { entry: './src/index.js' }",
    requiredChange: "export default defineConfig({ ... })",
    description: 'Webpack config will be replaced entirely by Vite config.',
    autoFixAvailable: false,
  },
  {
    id: 'bc-9',
    file: 'src/store/index.js',
    line: 5,
    severity: 'medium',
    currentPattern: "const store = createStore(rootReducer, applyMiddleware(thunk))",
    requiredChange: "const useStore = create((set) => ({ ... }))",
    description: 'Redux store creation pattern replaced with Zustand store.',
    autoFixAvailable: false,
  },
  {
    id: 'bc-10',
    file: 'src/utils/helpers.js',
    line: 30,
    severity: 'low',
    currentPattern: "const _ = require('lodash')",
    requiredChange: "import { debounce, merge } from 'lodash-es'",
    description: 'CommonJS require replaced with ESM named imports for tree-shaking.',
    autoFixAvailable: true,
  },
]

// ── Migration modules / plan ──

export const migrationModules: MigrationModule[] = [
  {
    id: 'mod-1',
    name: 'Build System (Webpack → Vite)',
    phase: 1,
    status: 'complete',
    effortHours: 16,
    effortPoints: 5,
    breakingChanges: 1,
    riskScore: 35,
    loc: 200,
    testCoverage: 90,
    assignee: 'Sarah K.',
    progress: 100,
  },
  {
    id: 'mod-2',
    name: 'Module System (CJS → ESM)',
    phase: 1,
    status: 'complete',
    effortHours: 24,
    effortPoints: 8,
    breakingChanges: 2,
    riskScore: 40,
    loc: 1200,
    testCoverage: 75,
    assignee: 'Sarah K.',
    progress: 100,
  },
  {
    id: 'mod-3',
    name: 'Data Models (Mongoose 5 → 8)',
    phase: 2,
    status: 'in-progress',
    effortHours: 32,
    effortPoints: 13,
    breakingChanges: 3,
    riskScore: 55,
    loc: 2400,
    testCoverage: 70,
    assignee: 'Mike T.',
    progress: 65,
  },
  {
    id: 'mod-4',
    name: 'Date Utilities (Moment → date-fns)',
    phase: 2,
    status: 'in-progress',
    effortHours: 12,
    effortPoints: 3,
    breakingChanges: 1,
    riskScore: 30,
    loc: 800,
    testCoverage: 85,
    assignee: 'Lisa R.',
    progress: 40,
  },
  {
    id: 'mod-5',
    name: 'UI Components (jQuery → React)',
    phase: 3,
    status: 'not-started',
    effortHours: 80,
    effortPoints: 21,
    breakingChanges: 4,
    riskScore: 85,
    loc: 5600,
    testCoverage: 45,
    assignee: 'Alex M.',
    progress: 0,
  },
  {
    id: 'mod-6',
    name: 'State Management (Redux → Zustand)',
    phase: 3,
    status: 'not-started',
    effortHours: 40,
    effortPoints: 13,
    breakingChanges: 2,
    riskScore: 60,
    loc: 1800,
    testCoverage: 60,
    assignee: 'Alex M.',
    progress: 0,
  },
  {
    id: 'mod-7',
    name: 'API Layer (Express → Fastify)',
    phase: 4,
    status: 'not-started',
    effortHours: 56,
    effortPoints: 13,
    breakingChanges: 3,
    riskScore: 68,
    loc: 3100,
    testCoverage: 55,
    assignee: 'Mike T.',
    progress: 0,
  },
  {
    id: 'mod-8',
    name: 'Auth Module (Token refresh update)',
    phase: 4,
    status: 'blocked',
    effortHours: 20,
    effortPoints: 8,
    breakingChanges: 1,
    riskScore: 72,
    loc: 1800,
    testCoverage: 62,
    assignee: 'Lisa R.',
    progress: 0,
  },
  {
    id: 'mod-9',
    name: 'Core Module (React 16 → 19)',
    phase: 5,
    status: 'not-started',
    effortHours: 48,
    effortPoints: 13,
    breakingChanges: 2,
    riskScore: 85,
    loc: 4200,
    testCoverage: 45,
    assignee: 'Sarah K.',
    progress: 0,
  },
  {
    id: 'mod-10',
    name: 'Integration Testing & Cleanup',
    phase: 5,
    status: 'not-started',
    effortHours: 24,
    effortPoints: 8,
    breakingChanges: 0,
    riskScore: 20,
    loc: 500,
    testCoverage: 95,
    assignee: 'All',
    progress: 0,
  },
]

// ── Rollback steps ──

export const rollbackSteps: RollbackStep[] = [
  {
    id: 'rb-1',
    phase: 1,
    module: 'Build System',
    action: 'Restore webpack.config.js from git backup branch',
    command: 'git checkout migration-backup -- webpack.config.js',
    estimatedMinutes: 2,
    checked: false,
  },
  {
    id: 'rb-2',
    phase: 1,
    module: 'Build System',
    action: 'Revert package.json build scripts to webpack',
    command: 'git checkout migration-backup -- package.json && pnpm install',
    estimatedMinutes: 3,
    checked: false,
  },
  {
    id: 'rb-3',
    phase: 1,
    module: 'Module System',
    action: 'Run reverse codemod: ESM → CommonJS',
    command: 'npx jscodeshift -t transforms/esm-to-cjs.js src/',
    estimatedMinutes: 5,
    checked: false,
  },
  {
    id: 'rb-4',
    phase: 2,
    module: 'Data Models',
    action: 'Revert Mongoose schema changes and restore v5 connection config',
    command: 'git checkout migration-backup -- src/models/ src/config/db.js',
    estimatedMinutes: 3,
    checked: false,
    dependencyWarning: 'Reverting data models will break auth-module if already migrated',
  },
  {
    id: 'rb-5',
    phase: 2,
    module: 'Date Utilities',
    action: 'Restore moment.js imports and format strings',
    command: 'git checkout migration-backup -- src/utils/dates.js',
    estimatedMinutes: 2,
    checked: false,
  },
  {
    id: 'rb-6',
    phase: 3,
    module: 'UI Components',
    action: 'Restore jQuery components and revert React conversions',
    command: 'git checkout migration-backup -- src/components/',
    estimatedMinutes: 5,
    checked: false,
    dependencyWarning: 'Reverting UI components requires reverting state management changes too',
  },
  {
    id: 'rb-7',
    phase: 3,
    module: 'State Management',
    action: 'Restore Redux store, reducers, and action creators',
    command: 'git checkout migration-backup -- src/store/',
    estimatedMinutes: 4,
    checked: false,
  },
  {
    id: 'rb-8',
    phase: 4,
    module: 'API Layer',
    action: 'Revert to Express server and restore all route handlers',
    command: 'git checkout migration-backup -- src/api/ src/server.js',
    estimatedMinutes: 5,
    checked: false,
    dependencyWarning: 'Reverting API layer requires reverting auth module changes',
  },
  {
    id: 'rb-9',
    phase: 4,
    module: 'Auth Module',
    action: 'Restore original JWT token refresh logic',
    command: 'git checkout migration-backup -- src/middleware/auth.js',
    estimatedMinutes: 3,
    checked: false,
  },
  {
    id: 'rb-10',
    phase: 5,
    module: 'Core Module',
    action: 'Revert React 19 changes: restore class components, legacy context',
    command: 'git checkout migration-backup -- src/core/',
    estimatedMinutes: 8,
    checked: false,
    dependencyWarning: 'Reverting core module will break all downstream modules',
  },
  {
    id: 'rb-11',
    phase: 5,
    module: 'Validation',
    action: 'Run full test suite to verify rollback integrity',
    command: 'pnpm test && pnpm build',
    estimatedMinutes: 10,
    checked: false,
  },
]

// ── Script templates ──

export const scriptTemplates: ScriptTemplate[] = [
  {
    id: 'tpl-1',
    name: 'jQuery to React',
    from: 'jQuery',
    to: 'React',
    description: 'Convert jQuery DOM manipulation and event handling to React components with hooks.',
    beforeCode: `// jQuery component
$(document).ready(function() {
  $('#user-list').on('click', '.delete-btn', function() {
    const userId = $(this).data('id');
    $.ajax({
      url: '/api/users/' + userId,
      method: 'DELETE',
      success: function() {
        $(this).closest('li').fadeOut();
      }
    });
  });

  function loadUsers() {
    $.get('/api/users', function(users) {
      users.forEach(function(user) {
        $('#user-list').append(
          '<li>' + user.name +
          '<button class="delete-btn" data-id="' +
          user.id + '">Delete</button></li>'
        );
      });
    });
  }
  loadUsers();
});`,
    afterCode: `// React component
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const deleteUser = async (userId: string) => {
    await fetch(\`/api/users/\${userId}\`, {
      method: 'DELETE'
    });
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}`,
    manualSteps: [
      'Review all jQuery plugins and find React equivalents',
      'Convert jQuery animations to CSS transitions or framer-motion',
      'Replace $.ajax error handling with try/catch patterns',
      'Update test files to use React Testing Library instead of jQuery selectors',
    ],
  },
  {
    id: 'tpl-2',
    name: 'REST to GraphQL',
    from: 'REST API',
    to: 'GraphQL',
    description: 'Transform REST endpoint calls into GraphQL queries and mutations.',
    beforeCode: `// REST API calls
async function getUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

async function getUserPosts(userId: string) {
  const res = await fetch(
    \`/api/users/\${userId}/posts\`
  );
  return res.json();
}

async function updateUser(id: string, data: UserInput) {
  const res = await fetch(\`/api/users/\${id}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}`,
    afterCode: `// GraphQL queries and mutations
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
        createdAt
      }
    }
  }
\`;

const UPDATE_USER = gql\`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
\`;

function UserProfile({ userId }: { userId: string }) {
  const { data, loading } = useQuery(GET_USER, {
    variables: { id: userId }
  });
  const [updateUser] = useMutation(UPDATE_USER);

  // Single request fetches user + posts together
  if (loading) return <Spinner />;
  return <UserCard user={data.user} />;
}`,
    manualSteps: [
      'Design GraphQL schema types for all REST resources',
      'Implement GraphQL resolvers on the server',
      'Replace individual fetch calls with useQuery/useMutation hooks',
      'Update authentication headers for GraphQL endpoint',
      'Implement error handling with GraphQL error extensions',
    ],
  },
  {
    id: 'tpl-3',
    name: 'Monolith to Microservices',
    from: 'Monolith',
    to: 'Microservices',
    description: 'Extract bounded contexts from a monolithic application into independent microservices.',
    beforeCode: `// Monolithic Express app
const app = express();

// All routes in one process
app.get('/api/users', userController.list);
app.post('/api/users', userController.create);
app.get('/api/orders', orderController.list);
app.post('/api/orders', orderController.create);
app.get('/api/products', productController.list);
app.post('/api/payments', paymentController.charge);

// Direct database calls across domains
async function createOrder(userId, items) {
  const user = await User.findById(userId);
  const products = await Product.find({
    _id: { $in: items.map(i => i.productId) }
  });
  const order = await Order.create({
    user, products, total: calcTotal(products)
  });
  await Payment.charge(user.paymentMethod, order.total);
  await Email.send(user.email, 'Order confirmed');
  return order;
}`,
    afterCode: `// User Service (standalone)
// user-service/src/index.ts
const app = express();
app.get('/api/users', userController.list);
app.post('/api/users', userController.create);
// Own database, own deployment

// Order Service (event-driven)
// order-service/src/index.ts
async function createOrder(userId: string, items: Item[]) {
  // Call User Service via HTTP
  const user = await userClient.getUser(userId);

  // Call Product Service via HTTP
  const products = await productClient.getProducts(
    items.map(i => i.productId)
  );

  const order = await Order.create({
    userId, productIds: items.map(i => i.productId),
    total: calcTotal(products)
  });

  // Publish event instead of direct calls
  await eventBus.publish('order.created', {
    orderId: order.id,
    userId,
    total: order.total,
  });

  return order;
}

// Payment Service (event consumer)
// payment-service/src/index.ts
eventBus.subscribe('order.created', async (event) => {
  await Payment.charge(event.userId, event.total);
  await eventBus.publish('payment.completed', {
    orderId: event.orderId
  });
});`,
    manualSteps: [
      'Identify bounded contexts and define service boundaries',
      'Set up service discovery and API gateway',
      'Implement event bus (e.g., RabbitMQ, Kafka, or NATS)',
      'Add circuit breakers for inter-service communication',
      'Set up distributed tracing (OpenTelemetry)',
      'Create Docker containers and Kubernetes manifests for each service',
      'Implement saga pattern for distributed transactions',
    ],
  },
]

// ── Repo analysis ──

export const sampleRepoAnalysis: RepoAnalysis = {
  name: 'acme-web-platform',
  totalFiles: 847,
  totalLoc: 62340,
  languages: [
    { name: 'JavaScript', percentage: 52, color: '#f7df1e' },
    { name: 'TypeScript', percentage: 28, color: '#3178c6' },
    { name: 'CSS', percentage: 12, color: '#563d7c' },
    { name: 'HTML', percentage: 5, color: '#e34c26' },
    { name: 'JSON', percentage: 3, color: '#292929' },
  ],
  frameworks: ['React 16.14', 'Express 4.17', 'jQuery 3.5', 'Redux 4.1'],
  buildSystem: 'Webpack 4',
  dependencies: 47,
  devDependencies: 32,
}

export const samplePackageJson = `{
  "name": "acme-web-platform",
  "version": "3.2.1",
  "dependencies": {
    "react": "16.14.0",
    "react-dom": "16.14.0",
    "react-redux": "7.2.6",
    "redux": "4.1.2",
    "redux-thunk": "2.4.1",
    "jquery": "3.5.1",
    "express": "4.17.1",
    "mongoose": "5.13.0",
    "moment": "2.29.1",
    "lodash": "4.17.15",
    "axios": "0.21.1",
    "jsonwebtoken": "8.5.1",
    "bcrypt": "5.0.0",
    "cors": "2.8.5"
  },
  "devDependencies": {
    "webpack": "4.46.0",
    "babel-loader": "8.2.3",
    "@babel/core": "7.16.0",
    "jest": "27.4.5",
    "eslint": "7.32.0"
  }
}`

// ── Helper functions ──

export function getRiskColor(risk: number): string {
  if (risk >= 75) return '#ef4444' // red
  if (risk >= 50) return '#f59e0b' // amber
  if (risk >= 25) return '#14b8a6' // teal
  return '#22c55e' // green
}

export function getRiskLabel(risk: number): string {
  if (risk >= 75) return 'High'
  if (risk >= 50) return 'Medium'
  if (risk >= 25) return 'Low'
  return 'Safe'
}

export function getSeverityColor(severity: BreakingChange['severity']): string {
  switch (severity) {
    case 'critical': return '#ef4444'
    case 'high': return '#f59e0b'
    case 'medium': return '#14b8a6'
    case 'low': return '#6b7280'
  }
}
