import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box, Stack, Button, Container, Typography, Breadcrumbs } from '@mui/material';

import Iconify from '../iconify';

const CustomBreadCrumps = ({
  headText,
  icon1,
  icon2,
  subname1,
  subname2,
  redirectlink,
  redirectIcon,
  buttonName,
}) => (
  <Container>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Box>
        <Typography variant="h4">{headText}</Typography>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
            >
              <Box component="span" sx={{ width: 17, height: 17, mr: 1 }}>
                {icon1}
              </Box>
              {subname1}
            </Typography>
            {subname2 && (
              <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                <Box component="span" sx={{ width: 17, height: 17, mr: 1 }}>
                  {icon2}
                </Box>
                {subname2}
              </Typography>
            )}
          </Breadcrumbs>
        </div>
      </Box>
      {buttonName && (
        <Link to={redirectlink}>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon={redirectIcon} />}>
            {buttonName}
          </Button>
        </Link>
      )}
    </Stack>
  </Container>
);

CustomBreadCrumps.propTypes = {
  headText: PropTypes.string.isRequired,
  icon1: PropTypes.node.isRequired,
  icon2: PropTypes.node.isRequired,
  subname1: PropTypes.string.isRequired,
  subname2: PropTypes.string.isRequired,
  redirectlink: PropTypes.string.isRequired,
  redirectIcon: PropTypes.node.isRequired,
  buttonName: PropTypes.string.isRequired,
};

export default CustomBreadCrumps;
