import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';

function RHFSelect({ control, errors, menuItems, label, name }) {
  return (
    <FormControl fullWidth error={Boolean(errors[name])}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Controller
        render={({ field }) => (
          <Select
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: '300px', // Maximum height of the dropdown menu
                },
              },
            }}
            label={label}
            {...field}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}
        name={name}
        rules={{ required: 'This field is required' }}
        control={control}
        defaultValue=""
      />
      <FormHelperText>{errors[name] && errors[name].message}</FormHelperText>
    </FormControl>
  );
}

RHFSelect.propTypes = {
  control: PropTypes.object.isRequired, // React hook form control object
  errors: PropTypes.object.isRequired, // Object containing form errors
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired, // Value of the menu item
      label: PropTypes.string.isRequired, // Label of the menu item
    })
  ).isRequired, // Array of menu items
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default RHFSelect;
