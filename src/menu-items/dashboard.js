import { LayoutDashboard } from 'lucide-react';

const icons = {
  LayoutDashboard
};

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.LayoutDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
