import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const CustomSubmitButton = ({ name, disabled, onClick }) => {
  const uppercaseName = name.toUpperCase();

  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center" item xs={12}>
      
      <Button
        disabled={disabled}
        style={{ letterSpacing: '2px' }}
        type="submit"
        className="h-12 w-full text-[20px]"
        variant="contained"
        color="inherit"
        sx={{
          backgroundColor: '#07BFCB', 
          color: 'white',
        }}
        onClick={handleClick}
        startIcon={disabled && <CircularProgress size={24} color="inherit" />}
      >
        {uppercaseName}
      </Button>
    </Grid>
  );
};

CustomSubmitButton.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CustomSubmitButton;
