import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';

const CustomContainerGrid = ({ children, alignItems }) => (
  <Grid container spacing={2} alignItems={alignItems || 'center'}>
    {children}
  </Grid>
);
CustomContainerGrid.propTypes = {
  children: PropTypes.node.isRequired,
  alignItems: PropTypes.string, // Optional prop for alignItems
};
export default CustomContainerGrid;
