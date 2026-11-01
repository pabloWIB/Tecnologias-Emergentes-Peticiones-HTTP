import { BookUser } from 'lucide-react';

const icons = {
  BookUser
};

const teachers = {
  id: 'group-teachers',
  title: 'Teachers',
  type: 'group',
  children: [
    {
      id: 'teachers',
      title: 'Teachers',
      type: 'item',
      url: '/teachers',
      icon: icons.BookUser,
      breadcrumbs: false
    }
  ]
};

export default teachers;
