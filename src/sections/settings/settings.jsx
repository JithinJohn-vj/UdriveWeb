import * as yup from 'yup';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box, Grid, Typography } from '@mui/material';

import { useUpdatePassword } from 'src/api/employees/Mutations';

import { FormProvider, RHFPasswordField } from 'src/components/hook-form';
import CustomSubmitButton from 'src/components/custom-made/CustomSubmitButton';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Set width to 100%
        height: '100%', // Make sure the panel takes up the full height
      }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const updatePasswordMutation = useUpdatePassword();

  const validationSchema = yup.object().shape({
    oldPassword: yup.string().required('Old password is required'),
    newPassword: yup.string().required('New password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    updatePasswordMutation.mutate(data);
    console.log(data);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', width: 150 }}
      >
        <Tab label="Password" {...a11yProps(0)} sx={{ fontSize: '17px' }} />
        <Tab label="About" {...a11yProps(1)} sx={{ fontSize: '17px' }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className="md:w-1/2 mx-auto">
          <Typography className="hover:underline hover:cursor-pointer text-gray-500" variant="h4">
            Reset Password
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid paddingBottom={2} container spacing={2} alignItems="center">
              <>
                <Grid marginTop={2} item xs={24}>
                  <RHFPasswordField name="oldPassword" label="Old password" />
                </Grid>
                <Grid marginTop={2} item xs={24}>
                  <RHFPasswordField name="newPassword" label="New password" />
                </Grid>
                <Grid marginTop={2} item xs={24}>
                  <RHFPasswordField name="confirmPassword" label="Confirm password" />
                </Grid>
                <CustomSubmitButton name="Reset Password" />
              </>
            </Grid>
          </FormProvider>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ width: '100%' }} className="">
          <div>
            <h1 className="font-bold text-3xl text-gray-500 mb-8">U Drive Car Rentals</h1>
            <p className="text-lg leading-9">
              We are a Thrissur-based, professional self-drive car rental company that specialises
              in cars rentals in Thrissur and throughout Kerala. With more than a decade of
              expertise, we take great satisfaction in being the highest rated car rental company,
              providing excellent service to customers all over the world. We can assist you with
              car rentals in Thrissur for self-drive choices or airport car rentals. More than 100
              vehicles make up our fleet, which includes normal, luxury, and budget vehicles with
              manual and automatic transmissions, as well as petrol and diesel alternatives. In
              addition to doorstep delivery and pickup in practically every area of Kerala, we offer
              convenient delivery and pickup services whenever needed at the airports in Kochi and
              Calicut. Our ultimate goal is to make renting a car easy and to offer reasonably
              priced, high-quality vehicles along with first-rate assistance during the whole
              procedure. Therefore,go no further than us if you&apos;re seeking for self-drive car
              rental in Thrissur or anyplace else in Kerala!
            </p>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
