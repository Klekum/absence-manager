import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';

interface PropDefs {
  onChange: (value: DateRange<Dayjs>) => void;
  defaultValue?: DateRange<Dayjs>;
}

export default function BasicDateRangePicker({ onChange, defaultValue }: PropDefs) {
  const [value, setValue] = React.useState<DateRange<Dayjs>>(defaultValue || [null, null]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: 'Start', end: 'End' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <p className="filter-title">DATE PERIOD</p>

        <DateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            onChange(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}