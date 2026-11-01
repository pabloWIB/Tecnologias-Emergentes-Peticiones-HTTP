import { useEffect, useState } from 'react';

import { Button, Stack } from '@mui/material';

import { api } from 'api/cliente';
import MainCard from 'components/MainCard';
import DataTable from 'components/DataTable';
import ConfirmDelete from 'components/ConfirmDelete';
import Toast from 'components/Toast';
import { useFlashMessage } from 'hooks/useFlashMessage';
import TeacherActions from './components/TeacherActions';

import { Plus } from 'lucide-react';

import { Link } from 'react-router';

const COLUMNS = [
  { key: 'numberDocument', label: 'Document' },
  { key: 'name', label: 'Name', align: 'right' },
  { key: 'lastName', label: 'Last name', align: 'right' },
  { key: 'address', label: 'Address', align: 'right' },
  { key: 'age', label: 'Age', align: 'right' }
];

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const [message, setMessage] = useFlashMessage();
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setStatus('loading');
      try {
        const data = await api.list('teachers', controller.signal);
        setTeachers(data);
        setStatus(data.length === 0 ? 'empty' : 'ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error(error);
        setStatus('error');
      }
    };

    load();
    return () => controller.abort();
  }, [attempt]);

  const confirmDelete = async () => {
    setDeleting(true);
    setDeleteError('');
    try {
      await api.remove('teachers', toDelete._id);
      const rest = teachers.filter((teacher) => teacher._id !== toDelete._id);
      setTeachers(rest);
      if (rest.length === 0) setStatus('empty');
      setMessage(`${toDelete.name} ${toDelete.lastName} was deleted`);
      setToDelete(null);
    } catch (error) {
      console.error(error);
      setDeleteError('It was not deleted. Try again.');
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setToDelete(null);
    setDeleteError('');
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" component={Link} to="/teachers/create" startIcon={<Plus size={16} aria-hidden="true" />}>
          Add Teacher
        </Button>
      </Stack>

      <MainCard title="Teachers" content={false}>
        <DataTable
          ariaLabel="Teachers"
          columns={COLUMNS}
          rows={teachers}
          getRowId={(teacher) => teacher._id}
          status={status}
          emptyText="There are no teachers yet. Use «Add Teacher» to create the first one."
          errorText="The teachers could not be loaded."
          onRetry={() => setAttempt(attempt + 1)}
          renderActions={(teacher) => (
            <TeacherActions
              teacherId={teacher._id}
              teacherName={`${teacher.name} ${teacher.lastName}`}
              onDelete={() => setToDelete(teacher)}
            />
          )}
        />
      </MainCard>

      <ConfirmDelete
        open={toDelete !== null}
        itemName={toDelete ? `${toDelete.name} ${toDelete.lastName}` : ''}
        busy={deleting}
        error={deleteError}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <Toast message={message} onClose={() => setMessage('')} />
    </Stack>
  );
}
