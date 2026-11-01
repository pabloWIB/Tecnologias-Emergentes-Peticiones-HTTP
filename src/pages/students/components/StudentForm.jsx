import { useState } from 'react';

import { Button, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Stack, TextField } from '@mui/material';

import FormSection from 'components/FormSection';
import { DOCUMENT_TYPES, SUBJECTS } from 'utils/options';
import { toPersonBody, validateStudent } from 'utils/validation';

import { Link } from 'react-router';

const EMPTY_TEACHER = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  age: '',
  gender: 'female',
  typeDocument: 'identification_card',
  numberDocument: '',
  dateBirth: '',
  typeSubject: 'software_development'
};

export default function StudentForm({ initialValues = EMPTY_TEACHER, submitLabel = 'Create', saving = false, onSubmit }) {
  const [values, setValues] = useState({ ...EMPTY_TEACHER, ...initialValues, age: initialValues.age ?? '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitted) setErrors(validateStudent(next));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const found = validateStudent(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit(toPersonBody(values));
  };

  const field = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name] ?? ' '
  });

  return (
    <Stack component="form" onSubmit={handleSubmit} noValidate spacing={3} sx={{ px: { xs: 0, md: 4, lg: 20 } }}>
      <FormSection title="Basic details">
        <TextField label="Name" required {...field('name')} />
        <TextField label="Last Name" required {...field('lastName')} />
        <TextField label="Email" type="email" required {...field('email')} />
        <TextField label="Phone" type="tel" required {...field('phone')} />
        <TextField label="Address" required {...field('address')} />
        <TextField label="Age" type="number" {...field('age')} />
        <FormLabel id="student-gender-label">Gender</FormLabel>
        <RadioGroup aria-labelledby="student-gender-label" name="gender" value={values.gender} onChange={handleChange} row>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormSection>

      <FormSection title="Identity">
        <TextField select label="Type Document" {...field('typeDocument')}>
          {DOCUMENT_TYPES.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Number document" required {...field('numberDocument')} />
        <TextField label="Date of birth" type="date" required slotProps={{ inputLabel: { shrink: true } }} {...field('dateBirth')} />
      </FormSection>

      <FormSection title="Subjects">
        <TextField select label="Subject" required {...field('typeSubject')}>
          {SUBJECTS.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </FormSection>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" variant="outlined" component={Link} to="/students" disabled={saving}>
          Cancel
        </Button>
        <Button size="small" variant="contained" type="submit" disabled={saving}>
          {saving ? 'Saving...' : submitLabel}
        </Button>
      </Stack>
    </Stack>
  );
}
