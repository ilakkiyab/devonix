import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import BoardView from './pages/BoardView';
import TableView from './pages/TableView';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const mockTasks = [
  {
    id: 1,
    title: 'Implement Redis Caching',
    description: 'Integrate Redis for session caching to improve response times.',
    priority: 'High',
    assignee: 'John Doe',
    status: 'In Progress',
    projectId: 'PROJ-123'
  },
  {
    id: 2,
    title: 'Fix JWT Auth Bug',
    description: 'Resolve token expiration issues causing unauthorized access errors.',
    priority: 'Critical',
    assignee: 'Jane Smith',
    status: 'To Do',
    projectId: 'PROJ-124'
  },
  {
    id: 3,
    title: 'Design System Overhaul',
    description: 'Update the UI library to match the new brand guidelines.',
    priority: 'Medium',
    assignee: 'Alex Johnson',
    status: 'Backlog',
    projectId: 'PROJ-125'
  },
  {
    id: 4,
    title: 'API Rate Limiting',
    description: 'Implement rate limiting to prevent abuse of public APIs.',
    priority: 'High',
    assignee: 'Emily Davis',
    status: 'Done',
    projectId: 'PROJ-126'
  },
  {
    id: 5,
    title: 'Database Optimization',
    description: 'Optimize slow-running queries in the user analytics dashboard.',
    priority: 'Medium',
    assignee: 'Michael Brown',
    status: 'In Progress',
    projectId: 'PROJ-127'
  },
  {
    id: 6,
    title: 'CI/CD Pipeline Setup',
    description: 'Configure GitHub Actions for automated testing and deployment.',
    priority: 'High',
    assignee: 'Sarah Wilson',
    status: 'To Do',
    projectId: 'PROJ-128'
  },
  {
    id: 7,
    title: 'Accessibility Audit',
    description: 'Conduct an audit and fix accessibility issues in the main dashboard.',
    priority: 'Low',
    assignee: 'David Lee',
    status: 'Backlog',
    projectId: 'PROJ-129'
  },
  {
    id: 8,
    title: 'Payment Gateway Integration',
    description: 'Integrate Stripe for subscription-based payments.',
    priority: 'Critical',
    assignee: 'Jessica Martinez',
    status: 'In Progress',
    projectId: 'PROJ-130'
  },
  {
    id: 9,
    title: 'User Onboarding Flow',
    description: 'Design and implement a new user onboarding experience.',
    priority: 'Medium',
    assignee: 'Robert Taylor',
    status: 'To Do',
    projectId: 'PROJ-131'
  },
  {
    id: 10,
    title: 'Security Vulnerability Patch',
    description: 'Patch identified security vulnerabilities in the authentication module.',
    priority: 'Critical',
    assignee: 'Lisa Anderson',
    status: 'Done',
    projectId: 'PROJ-132'
  },
  {
    id: 11,
    title: 'Mobile Responsiveness Fixes',
    description: 'Fix layout issues on mobile devices for the settings page.',
    priority: 'Low',
    assignee: 'Thomas Moore',
    status: 'Backlog',
    projectId: 'PROJ-133'
  },
  {
    id: 12,
    title: 'Performance Monitoring',
    description: 'Set up monitoring for API response times and error rates.',
    priority: 'Medium',
    assignee: 'Karen Jackson',
    status: 'In Progress',
    projectId: 'PROJ-134'
  },
  {
    id: 13,
    title: 'Localization Support',
    description: 'Add support for multiple languages in the frontend.',
    priority: 'High',
    assignee: 'Daniel White',
    status: 'To Do',
    projectId: 'PROJ-135'
  },
  {
    id: 14,
    title: 'Backup and Recovery System',
    description: 'Implement automated backups for user-generated content.',
    priority: 'Medium',
    assignee: 'Nancy Harris',
    status: 'Done',
    projectId: 'PROJ-136'
  },
  {
    id: 15,
    title: 'Dark Mode Implementation',
    description: 'Add dark mode support across all components.',
    priority: 'Low',
    assignee: 'Mark Clark',
    status: 'Backlog',
    projectId: 'PROJ-137'
  },
  {
    id: 16,
    title: 'WebSocket Integration',
    description: 'Implement WebSocket for real-time notifications.',
    priority: 'High',
    assignee: 'Laura Rodriguez',
    status: 'In Progress',
    projectId: 'PROJ-138'
  }
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<BoardView tasks={mockTasks} />} />
          <Route path="board" element={<BoardView tasks={mockTasks} />} />
          <Route path="table" element={<TableView tasks={mockTasks} />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;