import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  iNeedDefaultDate: PropTypes.bool,
};

export default function RHFDatePicker({ name, disabledDates, iNeedDefaultDate, ...other }) {
  const { control } = useFormContext();
  const onKeyDown = (e) => {
    e.preventDefault();
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={iNeedDefaultDate ? dayjs() : null}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            format="DD-MMM-YY"
            name={name}
            control={control}
            // disablePast
            shouldDisableDate={disabledDates}
            views={['year', 'month', 'day']}
            slotProps={{
              textField: { fullWidth: true },

              openPickerButton: {
                color: 'primary',
              },
              inputAdornment: {
                position: 'start',
              },
            }}
            {...field}
            fullWidth
            {...other}
            renderInput={(params) => (
              <TextField
                onKeyDown={onKeyDown}
                {...params}
                error={!!error}
                helperText={error?.message}
              />
            )}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
