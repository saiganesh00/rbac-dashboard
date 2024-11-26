export const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: '2024-03-14',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Viewer',
    status: 'inactive',
    createdAt: '2024-03-13',
  },
];

export const permissions = [
  {
    id: '1',
    name: 'view_users',
    description: 'View user list and details',
    module: 'Users',
  },
  {
    id: '2',
    name: 'manage_users',
    description: 'Create, update, and delete users',
    module: 'Users',
  },
  {
    id: '3',
    name: 'view_roles',
    description: 'View role list and details',
    module: 'Roles',
  },
  {
    id: '4',
    name: 'manage_roles',
    description: 'Create, update, and delete roles',
    module: 'Roles',
  },
];

export const roles = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: permissions,
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can edit content and manage users',
    permissions: permissions.filter(p => !p.name.includes('manage_roles')),
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: permissions.filter(p => p.name.startsWith('view')),
  },
];