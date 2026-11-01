import { useState } from 'react';

import { Stack } from '@mui/material';

import { api } from 'api/cliente';
import InlineAlert from 'components/InlineAlert';
import TeacherForm from './components/TeacherForm';

import { useNavigate } from 'react-router';

export default function CreateTeacher() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (body) => {
    setSaving(true);
    setError(false);
    try {
      await api.create('teachers', body);
      navigate('/teachers', { state: { message: `${body.name} ${body.lastName} was created` } });
    } catch (err) {
      console.error(err);
      setError(true);
      setSaving(false);
    }
  };

  return (
    <Stack spacing={2}>
      {error && <InlineAlert type="bad" title="It was not saved." text="Check your connection and try again." />}
      <TeacherForm saving={saving} onSubmit={handleSubmit} />
    </Stack>
  );
}
