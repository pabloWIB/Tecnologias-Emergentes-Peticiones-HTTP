const LETTERS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]+$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ID_CARD = /^\d{7,10}$/;
const PASSPORT = /^[A-Za-z0-9]{6,12}$/;
const MOBILE = /^3\d{9}$/;
const TEACHER_CODE = /^[A-Za-z0-9-]{3,20}$/;

const ageFromDate = (date) => {
  const birth = new Date(`${date}T00:00:00`);
  const today = new Date();
  const hadBirthday =
    today.getMonth() > birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  return today.getFullYear() - birth.getFullYear() - (hadBirthday ? 0 : 1);
};

const cleanPhone = (phone) => String(phone ?? '').replace(/[\s-]/g, '');

export const validatePerson = (values, { minAge, maxAge }) => {
  const errors = {};
  const name = values.name.trim();
  const lastName = values.lastName.trim();
  const phone = cleanPhone(values.phone);
  const numberDocument = String(values.numberDocument).trim();

  if (name.length < 2) errors.name = 'Write at least 2 letters.';
  else if (!LETTERS.test(name)) errors.name = 'Use only letters.';

  if (lastName.length < 2) errors.lastName = 'Write at least 2 letters.';
  else if (!LETTERS.test(lastName)) errors.lastName = 'Use only letters.';

  if (!EMAIL.test(values.email.trim())) errors.email = 'Write a valid email, for example ana@correo.com.';

  if (!MOBILE.test(phone)) errors.phone = 'The mobile number must have 10 digits and start with 3.';

  if (values.address.trim().length < 5) errors.address = 'Write the full address.';

  if (values.age !== '') {
    const age = Number(values.age);
    if (!Number.isInteger(age) || age < minAge || age > maxAge) {
      errors.age = `The age must be a whole number between ${minAge} and ${maxAge}.`;
    }
  }

  if (values.typeDocument === 'identification_card' && !ID_CARD.test(numberDocument)) {
    errors.numberDocument = 'The identification card must have between 7 and 10 numbers.';
  } else if (values.typeDocument === 'passport' && !PASSPORT.test(numberDocument)) {
    errors.numberDocument = 'The passport must have between 6 and 12 letters or numbers.';
  }

  if (values.dateBirth === '') {
    errors.dateBirth = 'Select the date of birth.';
  } else if (new Date(values.dateBirth) > new Date()) {
    errors.dateBirth = 'The date cannot be in the future.';
  } else {
    const ageByDate = ageFromDate(values.dateBirth);
    if (ageByDate < minAge || ageByDate > maxAge) {
      errors.dateBirth = `The person must be between ${minAge} and ${maxAge} years old.`;
    } else if (values.age !== '' && !errors.age && Number(values.age) !== ageByDate) {
      errors.age = `The age does not match the date of birth (${ageByDate}).`;
    }
  }

  if (!values.typeSubject) errors.typeSubject = 'Choose a subject.';

  return errors;
};

export const validateStudent = (values) => validatePerson(values, { minAge: 14, maxAge: 90 });

export const validateTeacher = (values) => {
  const errors = validatePerson(values, { minAge: 18, maxAge: 90 });
  if (!TEACHER_CODE.test(values.code.trim())) errors.code = 'Use 3 to 20 letters, numbers or dashes, for example DOC-001.';
  return errors;
};

export const toPersonBody = (values) => ({
  name: values.name.trim(),
  lastName: values.lastName.trim(),
  email: values.email.trim().toLowerCase(),
  phone: cleanPhone(values.phone),
  address: values.address.trim(),
  ...(values.age !== '' && { age: Number(values.age) }),
  gender: values.gender,
  typeDocument: values.typeDocument,
  numberDocument: String(values.numberDocument).trim(),
  dateBirth: values.dateBirth,
  typeSubject: values.typeSubject
});

export const toTeacherBody = (values) => ({ ...toPersonBody(values), code: values.code.trim().toUpperCase() });
