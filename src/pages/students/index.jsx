import { useEffect, useState } from 'react';

import { Button, Stack } from '@mui/material';

import { api } from 'api/cliente';
import MainCard from 'components/MainCard';
import DataTable from 'components/DataTable';
import ConfirmDelete from 'components/ConfirmDelete';
import Toast from 'components/Toast';
import { useFlashMessage } from 'hooks/useFlashMessage';
import StudentActions from './components/StudentActions';

import { Plus } from 'lucide-react';

import { Link } from 'react-router';

const COLUMNS = [
  { key: 'numberDocument', label: 'Document' },
  { key: 'name', label: 'Name', align: 'right' },
  { key: 'lastName', label: 'Last name', align: 'right' },
  { key: 'address', label: 'Address', align: 'right' },
  { key: 'age', label: 'Age', align: 'right' }
];

export default function Students() {
  const [students, setStudents] = useState([]);
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
        const data = await api.list('students', controller.signal);
        setStudents(data);
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
      await api.remove('students', toDelete._id);
      const rest = students.filter((student) => student._id !== toDelete._id);
      setStudents(rest);
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
        <Button variant="contained" component={Link} to="/students/create" startIcon={<Plus size={16} aria-hidden="true" />}>
          Add Student
        </Button>
      </Stack>

      <MainCard title="Students" content={false}>
        <DataTable
          ariaLabel="Students"
          columns={COLUMNS}
          rows={students}
          getRowId={(student) => student._id}
          status={status}
          emptyText="There are no students yet. Use «Add Student» to create the first one."
          errorText="The students could not be loaded."
          onRetry={() => setAttempt(attempt + 1)}
          renderActions={(student) => (
            <StudentActions
              studentId={student._id}
              studentName={`${student.name} ${student.lastName}`}
              onDelete={() => setToDelete(student)}
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
