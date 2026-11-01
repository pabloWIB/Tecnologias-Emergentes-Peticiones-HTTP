import { useEffect, useState } from 'react';

import { LinearProgress, Stack } from '@mui/material';

import { api, errorText } from 'api/cliente';
import InlineAlert from 'components/InlineAlert';
import NotFound from 'pages/NotFound';
import TeacherForm from './components/TeacherForm';

import { useNavigate, useParams } from 'react-router';

const isInvalidId = (error) => error?.status === 404;

export default function EditTeacher() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setStatus('loading');
      try {
        const data = await api.get('teachers', teacherId, controller.signal);
        setTeacher(data);
        setStatus(data ? 'ready' : 'not-found');
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error(err);
        setStatus(isInvalidId(err) ? 'not-found' : 'error');
      }
    };

    load();
    return () => controller.abort();
  }, [teacherId, attempt]);

  const handleSubmit = async (body) => {
    setSaving(true);
    setError(false);
    try {
      await api.update('teachers', teacher._id, body);
      navigate('/teachers', { state: { message: `${body.name} ${body.lastName} was updated` } });
    } catch (err) {
      console.error(err);
      setError(errorText(err));
      setSaving(false);
    }
  };

  if (status === 'loading') return <LinearProgress aria-label="Loading teacher" />;

  if (status === 'not-found') {
    return (
      <NotFound
        title="Teacher not found"
        text="There is no teacher with that identifier."
        backTo="/teachers"
        backLabel="Back to teachers"
      />
    );
  }

  if (status === 'error') {
    return (
      <InlineAlert
        type="bad"
        title="The teacher could not be loaded."
        text="Try again."
        actionLabel="Retry"
        onAction={() => setAttempt(attempt + 1)}
      />
    );
  }

  return (
    <Stack spacing={2}>
      {error && <InlineAlert type="bad" title="The changes were not saved." text={error} />}
      <TeacherForm initialValues={teacher} submitLabel="Edit" saving={saving} onSubmit={handleSubmit} />
    </Stack>
  );
}
