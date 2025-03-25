import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  // New prop type for specifying input type
};

RHFTextField.defaultProps = {
  type: 'text', // Default type is set to 'text'
};

export default function RHFTextField({ name, defaultValue = '', type, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
