import { useRoutes } from 'react-router';

import MainRoutes from './MainRoutes';
import StudentsRoutes from './StudentsRoutes';
import TeachersRoutes from './TeachersRoutes';

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, StudentsRoutes, TeachersRoutes]);
}
