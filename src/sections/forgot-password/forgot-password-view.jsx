/* eslint-disable */
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

// Import TextField component
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

import { S3_LOGIN_IMAGE } from 'src/utils/config';

import { bgGradient } from 'src/theme/css';
import { useLoginEmployees } from 'src/api/auth/Mutations';

import Logo from 'src/components/logo';
import CustomSubmitButton from 'src/components/custom-made/CustomSubmitButton';
import { FormProvider, RHFTextField, RHFPasswordField } from 'src/components/hook-form';
import { Link } from 'react-router-dom';
import LottieMessageAnimation from 'src/components/lottie/MessengerLottie';
import { useForgotPassword } from 'src/api/employees/Mutations';

export default function ForgotPassword() {
  const theme = useTheme();
  const forgotPasswordMutation = useForgotPassword();

  const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    // password: yup.string().required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;
  const [showOtpInput, setShowOtpInput] = useState(false);

  const onSubmit = (data) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setShowOtpInput(true); // Set showOtpInput to true on successful mutation
      },
    });
    console.log(data);
  };

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid paddingBottom={2} container spacing={2} alignItems="center">
        {!showOtpInput && (
          <>
            <Grid marginTop={2} item xs={12}>
              <RHFTextField name="email" label="Email address" />
            </Grid>
            <CustomSubmitButton
              disabled={forgotPasswordMutation.isPending}
              name={forgotPasswordMutation.isPending ? 'Loading' : `Reset Password`}
            />{' '}
          </>
        )}
        <Grid marginTop={2} item xs={12}>
          {showOtpInput && <LottieMessageAnimation />}
        </Grid>

        <Grid item xs={12} textAlign="end">
          <Link to="/login" className="cursor-pointer text-[#167c73] hover:underline font-semibold">
            Return to login ?
          </Link>
        </Grid>
      </Grid>
    </FormProvider>
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="w-full pb-5  grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-[1400px] justify-center m-auto">
        <div>
          <Box
            sx={{
              ...bgGradient({
                color: alpha(theme.palette.background.default, 0.9),
                imgUrl: '/assets/background/overlay_4.jpg',
              }),
              height: 1,
            }}
          >
            <Logo
              disabledLink
              sx={{
                position: 'fixed',
                top: { xs: 16, md: 24 },
                left: { xs: 16, md: 24 },
              }}
            />

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Card
                sx={{
                  p: 5,
                  width: 1,
                  maxWidth: 420,
                }}
              >
                <Typography
                  className={`text-gray-500 text-xl uppercase ${showOtpInput && 'mb-10'}`}
                  style={{ fontSize: '16px' }}
                  variant="overline"
                >
                  {showOtpInput ? 'Reset link sent to your mail' : 'Enter your email'}
                </Typography>
                {renderForm}
              </Card>

              <h1 className="invisible">spacer</h1>
              <h1 className="invisible">spacer</h1>
            </Stack>
          </Box>
        </div>
        <ShuffleGrid />
      </section>
    </div>
  );
}

const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: `${S3_LOGIN_IMAGE}photo-1494976388531-d1058494cdd8.avif`,
  },
  {
    id: 2,
    src: `${S3_LOGIN_IMAGE}photo-1501066927591-314112b5888e.avif`,
  },
  {
    id: 3,
    src: `${S3_LOGIN_IMAGE}photo-1502161254066-6c74afbf07aa.avif`,
  },
  {
    id: 4,
    src: `${S3_LOGIN_IMAGE}photo-1506610654-064fbba4780c.avif`,
  },
  {
    id: 5,
    src: `${S3_LOGIN_IMAGE}photo-1508048236731-b5ef91f7840c.avif`,
  },
  {
    id: 6,
    src: `${S3_LOGIN_IMAGE}photo-1528501028382-e587fcf3a03e.avif`,
  },
  {
    id: 7,
    src: `${S3_LOGIN_IMAGE}photo-1530675706010-bc677ce30ab6.avif`,
  },
  {
    id: 8,
    src: `${S3_LOGIN_IMAGE}photo-1532581140115-3e355d1ed1de.avif`,
  },
  {
    id: 9,
    src: `${S3_LOGIN_IMAGE}photo-1541443131876-44b03de101c5.avif`,
  },
  {
    id: 10,
    src: `${S3_LOGIN_IMAGE}photo-1553440569-bcc63803a83d.avif`,
  },
  {
    id: 11,
    src: `${S3_LOGIN_IMAGE}photo-1555215695-3004980ad54e.avif`,
  },
  {
    id: 12,
    src: `${S3_LOGIN_IMAGE}photo-1567284575269-d4be568f1072.avif`,
  },
  {
    id: 13,
    src: `${S3_LOGIN_IMAGE}photo-1592853625601-bb9d23da12fc.avif`,
  },
  {
    id: 14,
    src: `${S3_LOGIN_IMAGE}photo-1605330757549-67b5021634ba.avif`,
  },
  {
    id: 15,
    src: `${S3_LOGIN_IMAGE}photo-1618843479313-40f8afb4b4d8.avif`,
  },
  {
    id: 16,
    src: `${S3_LOGIN_IMAGE}photo-1620882788693-cd891b20837d.avif`,
  },
];

const generateSquares = () =>
  shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: 'spring' }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: 'cover',
      }}
    />
  ));

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="md:grid grid-cols-4 grid-rows-4 h-[500px] hidden  gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};
