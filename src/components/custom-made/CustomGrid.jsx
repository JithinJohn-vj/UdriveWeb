import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';

const CustomGrid = ({ children, layout }) => {
  const [xs, md] = layout;

  return (
    <Grid item xs={xs} {...(md && { md })}>
      {children}
    </Grid>
  );
};

CustomGrid.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default CustomGrid;
