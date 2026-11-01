import { useEffect, useState } from 'react';

import { api } from 'api/cliente';

const toRecord = (group, path) => (person) => ({
  group,
  label: `${person.name} ${person.lastName}`,
  detail: `Document ${person.numberDocument}`,
  url: `/${path}/edit/${person._id}`
});

export const useSearchRecords = (open) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!open) return undefined;
    const controller = new AbortController();

    const load = async () => {
      try {
        const [students, teachers] = await Promise.all([
          api.list('students', controller.signal),
          api.list('teachers', controller.signal)
        ]);
        setRecords([...students.map(toRecord('Students', 'students')), ...teachers.map(toRecord('Teachers', 'teachers'))]);
      } catch (error) {
        if (error.name !== 'AbortError') console.error(error);
      }
    };

    load();
    return () => controller.abort();
  }, [open]);

  return records;
};
