import { useState } from 'react';

import { Stack } from '@mui/material';

import { api, errorText } from 'api/cliente';
import InlineAlert from 'components/InlineAlert';
import StudentForm from './components/StudentForm';

import { useNavigate } from 'react-router';

export default function CreateStudent() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (body) => {
    setSaving(true);
    setError(false);
    try {
      await api.create('students', body);
      navigate('/students', { state: { message: `${body.name} ${body.lastName} was created` } });
    } catch (err) {
      console.error(err);
      setError(errorText(err));
      setSaving(false);
    }
  };

  return (
    <Stack spacing={2}>
      {error && <InlineAlert type="bad" title="It was not saved." text={error} />}
      <StudentForm saving={saving} onSubmit={handleSubmit} />
    </Stack>
  );
}
