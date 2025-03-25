/* eslint-disable */
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Card, FormControl, FormLabel, Grid, Stack, Typography, useMediaQuery, FormHelperText } from '@mui/material';
import { useState } from 'react';

import { S3_LOGIN_IMAGE } from 'src/utils/config';
import { useLoginEmployees } from 'src/api/auth/Mutations';

import Logo from 'src/components/logo';
import CustomSubmitButton from 'src/components/custom-made/CustomSubmitButton';
import { RHFTextField, RHFPasswordField } from 'src/components/hook-form';
import { Link } from 'react-router-dom';
import Iconify from 'src/components/iconify';

export default function ShuffleHero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const loginMutation = useLoginEmployees();
  const [darkMode, setDarkMode] = useState(theme.palette.mode === 'dark');

  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add logic to toggle theme mode
  };

  const renderForm = (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid paddingBottom={0} container spacing={2} alignItems="center">
          <Grid marginTop={2} item xs={12}>
            <FormControl fullWidth error={Boolean(errors.email)}>
              <FormLabel>Email</FormLabel>
              <RHFTextField
                name="email"
                placeholder="Email"
                sx={{ height: '40px' }} 
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(errors.password)}>
              <FormLabel>Password</FormLabel>
              <RHFPasswordField
                name="password"
                placeholder="Password"
                sx={{ height: '40px' }} 
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} textAlign="end">
            <Link
              to="/forgot-password"
              className="cursor-pointer text-[#167c73] hover:underline font-semibold"
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item xs={12}>
            <CustomSubmitButton
              disabled={loginMutation.isLoading}
              name={loginMutation.isLoading ? 'Loading' : 'Login'}
            />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );

  const cardStyles = {
    padding: theme.spacing(5),
    width: 1,
    maxWidth: isMobile ? 320 : isTablet ? 480 : 420,
    boxShadow: 'none',
    backgroundColor: 'transparent',
    border: '1px solid skyblue',
    borderRadius: '8px',
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
      >
        <Logo disabledLink />
      </Box>
      <section className={`w-full grid ${isMobile || isTablet ? 'grid-cols-1' : 'grid-cols-2'} items-center gap-4 max-w-[1400px] justify-center m-auto`}>
        <div>
          <Box sx={{ height: 1 }}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Card sx={cardStyles}>
                <Typography
                  className="text-gray-500"
                  style={{ fontSize: '34px', textAlign: 'center', marginBottom: '8px', color: darkMode ? 'white' : 'inherit' }}
                  variant="h4"
                >
                  Welcome
                </Typography>
                <Typography
                  className="text-gray-500"
                  style={{ fontSize: '19px', textAlign: 'center', marginBottom: '8px', color: darkMode ? 'white' : 'inherit' }}
                  variant="subtitle1"
                >
                  Login to your account
                </Typography>
                {renderForm}
              </Card>
            </Stack>
          </Box>
        </div>
        {!isMobile && !isTablet && <SingleCarImage darkMode={darkMode} />}
      </section>
    </div>
  );
}

const SingleCarImage = ({ darkMode }) => {
  const carImageUrl = darkMode ? '/assets/background/black.svg' : '/assets/background/white.svg';

  return (
    <div className="md:grid grid-cols-1 grid-rows-1 h-[500px] hidden md:block gap-1">
      <motion.div
        key="car"
        layout
        transition={{ duration: 1.5, type: 'spring' }}
        className="w-full h-full"
        style={{
          backgroundImage: `url(${carImageUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
};
