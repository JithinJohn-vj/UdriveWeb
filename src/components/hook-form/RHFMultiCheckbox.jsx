import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Grid,
  Checkbox,
  FormGroup,
  Typography,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

RHFMultiCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  errors: PropTypes.object,
};

export default function RHFMultiCheckbox({ name, label, options, errors, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) => {
          const optionIndex = field.value.findIndex((item) => item.value === option.value);
          if (optionIndex !== -1) {
            const updatedValue = [...field.value];
            updatedValue.splice(optionIndex, 1);
            return updatedValue;
          }
          return [...field.value, option];
        };

        return (
          <FormGroup>
            {label && (
              <Typography variant="subtitle1" gutterBottom>
                {label}
              </Typography>
            )}
            <Grid container spacing={2}>
              {options.map((option) => (
                <Grid item xs={6} key={option.value}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value.some((item) => item.value === option.value)}
                        onChange={() => field.onChange(onSelected(option))}
                      />
                    }
                    label={option.title}
                    {...other}
                  />
                </Grid>
              ))}
            </Grid>
            {errors && errors[name] && (
              <FormHelperText error>{errors[name].message}</FormHelperText>
            )}
          </FormGroup>
        );
      }}
    />
  );
}
