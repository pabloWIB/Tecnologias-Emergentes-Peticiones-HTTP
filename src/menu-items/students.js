import { GraduationCap } from 'lucide-react';

const icons = {
  GraduationCap
};

const students = {
  id: 'group-students',
  title: 'Students',
  type: 'group',
  children: [
    {
      id: 'students',
      title: 'Students',
      type: 'item',
      url: '/students',
      icon: icons.GraduationCap,
      breadcrumbs: false
    }
  ]
};

export default students;
