import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

RHFDateTimePicker.propTypes = {
  name: PropTypes.string,
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onChange: PropTypes.func,
  noDefault: PropTypes.bool,
};

RHFDateTimePicker.defaultProps = {
  onChange: undefined,
};

export default function RHFDateTimePicker({ name, noDefault, disabledDates, onChange, ...other }) {
  const { control } = useFormContext();
  const onKeyDown = (e) => {
    e.preventDefault();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={!noDefault && dayjs()}
        render={({ field, fieldState: { error } }) => (
          <DateTimePicker
            format="DD-MMM-YY (hh:mm a)"
            name={name}
            control={control}
            minDate={dayjs()} // Disable previous dates
            shouldDisableDate={disabledDates}
            views={['year', 'month', 'day', 'hours', 'minutes']}
            slotProps={{
              textField: { fullWidth: true },
              openPickerButton: { color: 'primary' },
              inputAdornment: { position: 'start' },
            }}
            {...field}
            fullWidth
            {...other}
            onChange={(value) => {
              field.onChange(value); // Update form value
              if (onChange) {
                onChange(value); // Call onChange handler if provided
              }
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                onKeyDown={onKeyDown}
                {...params}
                error={!!error}
                helperText={error?.message}
              />
            )}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
