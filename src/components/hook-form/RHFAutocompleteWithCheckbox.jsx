import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { Checkbox, TextField, Autocomplete } from '@mui/material';

import Iconify from '../iconify';

function RHFAutocompleteWithCheckbox({ control, name, defaultValue, options }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true, message: 'This field is required' }} // Modified rules
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          multiple
          options={options}
          defaultValue={defaultValue}
          getOptionLabel={(option) => option.title}
          disableCloseOnSelect
          onChange={(event, value) => field.onChange(value)}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                className="bg-red-200"
                icon={<Iconify icon="fontisto:checkbox-passive" />}
                checkedIcon={<Iconify icon="icomoon-free:checkbox-checked" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          style={{ width: 'full' }}
          renderInput={(params) => (
            <TextField
              error={!!error}
              helperText={error?.message}
              id={name}
              name={name}
              label="Access Allocation"
              placeholder="Provide access"
              {...params}
              value={field.value.join(', ')} // Join selected values with comma
            />
          )}
        />
      )}
    />
  );
}
RHFAutocompleteWithCheckbox.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.array,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default RHFAutocompleteWithCheckbox;
