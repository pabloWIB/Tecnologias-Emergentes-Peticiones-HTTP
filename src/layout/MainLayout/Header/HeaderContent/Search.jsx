import { useEffect, useMemo, useRef, useState } from 'react';

import { Autocomplete, Box, InputAdornment, TextField, Typography } from '@mui/material';

import menuItems from 'menu-items';
import { useSearchRecords } from 'hooks/useSearchRecords';

import { Search as SearchIcon } from 'lucide-react';

import { useNavigate } from 'react-router';

const normalize = (text) =>
  String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

const SCREENS = menuItems.items.flatMap((group) =>
  group.children.map(({ title, url }) => ({ group: 'Screens', label: title, detail: '', url }))
);

const MAX_RESULTS = 12;

export default function Search({ autoFocus = false, onDone }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const records = useSearchRecords(open);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const options = useMemo(() => [...SCREENS, ...records], [records]);

  const filterOptions = (list, { inputValue }) => {
    const words = normalize(inputValue).split(/\s+/).filter(Boolean);
    if (words.length === 0) return list.filter((option) => option.group === 'Screens');
    return list
      .filter((option) => {
        const haystack = normalize(`${option.label} ${option.detail}`);
        return words.every((word) => haystack.includes(word));
      })
      .slice(0, MAX_RESULTS);
  };

  const goTo = (option) => {
    if (!option) return;
    navigate(option.url);
    setQuery('');
    inputRef.current?.blur();
    onDone?.();
  };

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <Autocomplete
        id="header-search"
        size="small"
        forcePopupIcon={false}
        sx={{ width: { xs: '100%', md: 300 } }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        groupBy={(option) => option.group}
        getOptionLabel={(option) => option.label}
        getOptionKey={(option) => option.url}
        filterOptions={filterOptions}
        inputValue={query}
        onInputChange={(_, value) => setQuery(value)}
        value={null}
        onChange={(_, option) => goTo(option)}
        noOptionsText={`No results for «${query}»`}
        renderOption={({ key, ...props }, option) => (
          <li key={key} {...props}>
            <Box>
              <Typography variant="body1">{option.label}</Typography>
              {option.detail && (
                <Typography variant="caption" color="text.secondary">
                  {option.detail}
                </Typography>
              )}
            </Box>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={inputRef}
            autoFocus={autoFocus}
            placeholder="Search  (Ctrl + K)"
            slotProps={{
              ...params.slotProps,
              htmlInput: { ...params.slotProps.htmlInput, 'aria-label': 'Search screens, students and teachers' },
              input: {
                ...params.slotProps.input,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={16} aria-hidden="true" />
                  </InputAdornment>
                )
              }
            }}
          />
        )}
      />
    </Box>
  );
}
