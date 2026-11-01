import { useEffect, useState } from 'react';

import { LinearProgress, Stack } from '@mui/material';

import { api, errorText } from 'api/cliente';
import InlineAlert from 'components/InlineAlert';
import NotFound from 'pages/NotFound';
import StudentForm from './components/StudentForm';

import { useNavigate, useParams } from 'react-router';

const isInvalidId = (error) => error?.status === 404;

export default function EditStudent() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setStatus('loading');
      try {
        const data = await api.get('students', studentId, controller.signal);
        setStudent(data);
        setStatus(data ? 'ready' : 'not-found');
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error(err);
        setStatus(isInvalidId(err) ? 'not-found' : 'error');
      }
    };

    load();
    return () => controller.abort();
  }, [studentId, attempt]);

  const handleSubmit = async (body) => {
    setSaving(true);
    setError(false);
    try {
      await api.update('students', student._id, body);
      navigate('/students', { state: { message: `${body.name} ${body.lastName} was updated` } });
    } catch (err) {
      console.error(err);
      setError(errorText(err));
      setSaving(false);
    }
  };

  if (status === 'loading') return <LinearProgress aria-label="Loading student" />;

  if (status === 'not-found') {
    return (
      <NotFound
        title="Student not found"
        text="There is no student with that identifier."
        backTo="/students"
        backLabel="Back to students"
      />
    );
  }

  if (status === 'error') {
    return (
      <InlineAlert
        type="bad"
        title="The student could not be loaded."
        text="Try again."
        actionLabel="Retry"
        onAction={() => setAttempt(attempt + 1)}
      />
    );
  }

  return (
    <Stack spacing={2}>
      {error && <InlineAlert type="bad" title="The changes were not saved." text={error} />}
      <StudentForm initialValues={student} submitLabel="Edit" saving={saving} onSubmit={handleSubmit} />
    </Stack>
  );
}
