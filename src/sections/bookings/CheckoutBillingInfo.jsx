import PropTypes from 'prop-types';

// @mui
import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';

import Iconify from 'src/components/iconify';
// redux
// components

// ----------------------------------------------------------------------

CheckoutBillingInfo.propTypes = {
  onBackStep: PropTypes.func,
};

export default function CheckoutBillingInfo({ onBackStep }) {
  return (
    <Card
      className="mx-auto md:mr-0"
      sx={{
        mb: 3,
        maxWidth: 500,
        minWidth: 300,
      }}
    >
      <CardHeader
        title="Billing Address"
        action={
          <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />} onClick={onBackStep}>
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            Reece Chung (Office)
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          36901 Elmer Spurs Apt. 762 - Miramar, DE / 92836
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          990-588-5716
        </Typography>
      </CardContent>
    </Card>
  );
}
