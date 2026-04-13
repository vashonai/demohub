import rawProjects from './projects.json';

export interface AppData {
  id: string;
  name: string;
  description: string;
  category: string;
  lead?: string;
  demoUrl?: string;
  docsUrl?: string;
  lastUpdated: string;
  status: 'active' | 'beta' | 'deprecated';
  icon: string;
  deleted_at?: string | null;
  archived_at?: string | null;
}

const mockApps: AppData[] = [
  {
    id: '1',
    name: 'Customer Portal',
    description: 'A self-service portal for customers to manage their subscriptions and support tickets.',
    category: 'Customer Success',
    demoUrl: 'https://demo.customer-portal.example.com',
    docsUrl: 'https://docs.customer-portal.example.com',
    lastUpdated: '2026-03-15',
    status: 'active',
    icon: 'Users',
  },
  {
    id: '2',
    name: 'Inventory Manager',
    description: 'Internal tool for tracking warehouse inventory and supply chain logistics.',
    category: 'Operations',
    demoUrl: 'https://demo.inventory.example.com',
    docsUrl: 'https://docs.inventory.example.com',
    lastUpdated: '2026-04-01',
    status: 'active',
    icon: 'Package',
  },
  {
    id: '3',
    name: 'HR Dashboard',
    description: 'Centralized dashboard for HR to manage employee records, payroll, and benefits.',
    category: 'Human Resources',
    docsUrl: 'https://docs.hr.example.com',
    lastUpdated: '2026-02-20',
    status: 'active',
    icon: 'LayoutDashboard',
  },
  {
    id: '4',
    name: 'Marketing Analytics',
    description: 'Real-time analytics for marketing campaigns across social media and email.',
    category: 'Marketing',
    demoUrl: 'https://demo.marketing.example.com',
    lastUpdated: '2026-04-05',
    status: 'beta',
    icon: 'BarChart3',
  },
  {
    id: '5',
    name: 'DevOps Monitor',
    description: 'System monitoring and alerting tool for engineering teams.',
    category: 'Engineering',
    demoUrl: 'https://demo.devops.example.com',
    docsUrl: 'https://docs.devops.example.com',
    lastUpdated: '2026-04-08',
    status: 'active',
    icon: 'Activity',
  },
  {
    id: '6',
    name: 'Sales CRM',
    description: 'Custom CRM for the sales team to track leads and opportunities.',
    category: 'Sales',
    docsUrl: 'https://docs.sales.example.com',
    lastUpdated: '2026-01-10',
    status: 'deprecated',
    icon: 'Briefcase',
  },
  {
    id: '7',
    name: 'Legal Doc Generator',
    description: 'Automated tool for generating standard legal contracts and NDAs.',
    category: 'Legal',
    demoUrl: 'https://demo.legal.example.com',
    lastUpdated: '2026-03-28',
    status: 'active',
    icon: 'FileText',
  },
  {
    id: '8',
    name: 'Finance Tracker',
    description: 'Internal expense tracking and budget management tool.',
    category: 'Finance',
    docsUrl: 'https://docs.finance.example.com',
    lastUpdated: '2026-04-02',
    status: 'active',
    icon: 'Wallet',
  }
];

const internalProjects: AppData[] = rawProjects.map((p, index) => ({
  id: `proj-${p.id}`,
  name: p.name,
  description: p.description,
  category: 'Internal Project',
  lead: p.lead,
  demoUrl: p.demoUrl || undefined,
  docsUrl: p.docUrl || undefined,
  lastUpdated: new Date().toISOString().split('T')[0],
  status: 'active',
  icon: 'Briefcase'
}));

export const applications: AppData[] = [...mockApps, ...internalProjects];
