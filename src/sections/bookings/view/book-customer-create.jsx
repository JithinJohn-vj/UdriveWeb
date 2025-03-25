import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@mui/material/Container';
// Import TextField component

import { useState, useEffect } from 'react';

import {
  Card,
  Checkbox,
  TextField,
  Typography,
  CardContent,
  FormControlLabel,
} from '@mui/material';

import EditId from 'src/zustand/EditId';
import { useGetCustomersById } from 'src/api/customers/Queries';
import { useEditCustomers, useCreateCustomersOnBookingTime } from 'src/api/customers/Mutations';

import CustomGrid from 'src/components/custom-made/CustomGrid';
import CustomSubmitButton from 'src/components/custom-made/CustomSubmitButton';
import CustomContainerGrid from 'src/components/custom-made/CustomContainerGrid';
import { RHFSelect, FormProvider, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
BookingCustomerCreate.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  onCustomerCreate: PropTypes.func.isRequired,
};
export default function BookingCustomerCreate({ isEdit, onCustomerCreate }) {
  const editId = EditId((state) => state.id);
  const CreateCustomerMutation = useCreateCustomersOnBookingTime();
  const EditCustomerMutation = useEditCustomers();
  const singleCustomerQuery = useGetCustomersById(editId);
  const states = [
    {
      value: 'AN',
      label: 'Andaman and Nicobar Island',
    },
    {
      value: 'AP',
      label: 'Andhra Pradesh',
    },
    {
      value: 'AR',
      label: 'Arunachal Pradesh',
    },
    {
      value: 'AS',
      label: 'Assam',
    },
    {
      value: 'BR',
      label: 'Bihar',
    },
    {
      value: 'CG',
      label: 'Chandigarh',
    },
    {
      value: 'CH',
      label: 'Chhattisgarh',
    },
    {
      value: 'DH',
      label: 'Dadra and Nagar Haveli',
    },
    {
      value: 'DD',
      label: 'Daman and Diu',
    },
    {
      value: 'DL',
      label: 'Delhi',
    },
    {
      value: 'GA',
      label: 'Goa',
    },
    {
      value: 'GJ',
      label: 'Gujarat',
    },
    {
      value: 'HR',
      label: 'Haryana',
    },
    {
      value: 'HP',
      label: 'Himachal Pradesh',
    },
    {
      value: 'JK',
      label: 'Jammu and Kashmir',
    },
    {
      value: 'JH',
      label: 'Jharkhand',
    },
    {
      value: 'KA',
      label: 'Karnataka',
    },
    {
      value: 'KL',
      label: 'Kerala',
    },
    {
      value: 'LD',
      label: 'Lakshadweep',
    },
    {
      value: 'MP',
      label: 'Madhya Pradesh',
    },
    {
      value: 'MH',
      label: 'Maharashtra',
    },
    {
      value: 'MN',
      label: 'Manipur',
    },
    {
      value: 'ML',
      label: 'Meghalaya',
    },
    {
      value: 'MZ',
      label: 'Mizoram',
    },
    {
      value: 'NL',
      label: 'Nagaland',
    },
    {
      value: 'OR',
      label: 'Odisha',
    },
    {
      value: 'PY',
      label: 'Puducherry',
    },
    {
      value: 'PB',
      label: 'Punjab',
    },
    {
      value: 'RJ',
      label: 'Rajasthan',
    },
    {
      value: 'SK',
      label: 'Sikkim',
    },
    {
      value: 'TN',
      label: 'Tamil Nadu',
    },
    {
      value: 'TS',
      label: 'Telangana',
    },
    {
      value: 'TR',
      label: 'Tripura',
    },
    {
      value: 'UK',
      label: 'Uttarakhand',
    },
    {
      value: 'UP',
      label: 'Uttar Pradesh',
    },
    {
      value: 'WB',
      label: 'West Bengal',
    },
  ];

  const [contactNumber, setContactNumber] = useState('');
  const [abroadNumber, setAbroadNumber] = useState('');
  const [nativeNumber, setNativeNumber] = useState('');
  const [copyContact, setCopyContact] = useState(false);
  const [customerCreateSucessMsg, setCustomerCreateSucessMsg] = useState(false);
  const handleCheckboxChange = () => {
    setCopyContact(!copyContact);
    if (!copyContact) {
      setAbroadNumber(contactNumber);
      setNativeNumber(contactNumber);
    } else {
      setAbroadNumber('');
      setNativeNumber('');
    }
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('First name is required'),
    email: yup.string().required('email is required'),
    // passportNumber: yup.string().required('Passport Number is required'),
    // pincode: yup.number().required('pincode is required'),
    state: yup.string().required('state is required'),
    // address: yup.string().required('Address is required'),
    locality: yup.string().required('locality is required'),
    cityOrDistrict: yup.string().required('city is required'),
  });

  const defaultValues = {
    name: '',
    userName: '',
    password: '',
    role: '',
    access: [],
  };

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;
  console.log(errors);

  const handleContactChange = (e) => {
    setContactNumber(e.target.value);
    if (errors.contactNumber) {
      methods.clearErrors('contactNumber');
    }
    if (copyContact) {
      setAbroadNumber(e.target.value);
      setNativeNumber(e.target.value);
    }
  };
  useEffect(() => {
    if (singleCustomerQuery.status === 'success' && isEdit) {
      setContactNumber(singleCustomerQuery?.data?.contactNumber || '');
      setAbroadNumber(singleCustomerQuery?.data?.abroadNumber || '');
      setNativeNumber(singleCustomerQuery?.data?.nativeNumber || '');
      console.log(singleCustomerQuery.data);
      reset(singleCustomerQuery.data);
    } else {
      setContactNumber('');
      setAbroadNumber('');
      setNativeNumber('');
      reset({
        name: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleCustomerQuery?.status === 'success', reset, isEdit]);

  const onSubmit = (data) => {
    const values = {
      ...data,
      contactNumber: Number(contactNumber),
      abroadNumber: Number(abroadNumber),
      nativeNumber: Number(nativeNumber),
    };
    if (isEdit) {
      console.log('first');
      console.log(data);
      EditCustomerMutation.mutate(values);
    } else {
      CreateCustomerMutation.mutate(values, {
        onSuccess: () => {
          onCustomerCreate(true);
          setCustomerCreateSucessMsg(true);
        },
      });
    }
    console.log(values);
  };

  return (
    <Container>
      {customerCreateSucessMsg ? (
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Customer Successfully Created
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The customer has been successfully created. You can now proceed to the next step.
            </Typography>
            {/* <CheckCircleIcon sx={{ color: 'success.main', fontSize: 40 }} /> */}
          </CardContent>
        </Card>
      ) : (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CustomContainerGrid>
            <CustomGrid layout={[12, 6]}>
              <RHFTextField name="name" label="Name" />
            </CustomGrid>
            <CustomGrid layout={[12, 6]}>
              <TextField
                type="number"
                fullWidth
                name="contactNumber"
                label="Contact Number"
                value={contactNumber}
                onChange={handleContactChange}
              />{' '}
            </CustomGrid>
            <CustomGrid layout={[12]}>
              <FormControlLabel
                control={<Checkbox checked={copyContact} onChange={handleCheckboxChange} />}
                label="Copy Contact number to Abroad Number and Native number fields"
              />
            </CustomGrid>
            <CustomGrid layout={[12, 6]}>
              <TextField
                fullWidth
                type="number"
                name="abroadNumber"
                label="Abroad Number"
                value={abroadNumber}
                onChange={(e) => setAbroadNumber(e.target.value)}
              />
            </CustomGrid>
            <CustomGrid layout={[12, 6]}>
              <TextField
                fullWidth
                type="number"
                name="nativeNumber"
                label="Native Number"
                value={nativeNumber}
                onChange={(e) => setNativeNumber(e.target.value)}
              />
            </CustomGrid>
            <CustomGrid layout={[12, 6]}>
              <RHFTextField name="email" label="Email" />
            </CustomGrid>
            {/* <CustomGrid layout={[12, 6]}>
              <RHFTextField name="passportNumber" label="Passport Number" />
            </CustomGrid>
            <CustomGrid layout={[12, 6]}>
              <RHFTextField type="number" name="pincode" label="Pincode" />
            </CustomGrid> */}
            <CustomGrid layout={[12, 6]}>
              <RHFSelect
                label="State"
                name="state"
                control={control}
                errors={errors}
                menuItems={states}
              />
            </CustomGrid>
            {/* <CustomGrid layout={[12, 6]}>
              <RHFTextField name="address" label="Address(House No,Building,street,Area)" />
            </CustomGrid> */}
            <CustomGrid layout={[12, 6]}>
              <RHFTextField name="locality" label="locality/town" />
            </CustomGrid>
            <CustomGrid layout={[12, 6]}>
              <RHFTextField name="cityOrDistrict" label="City/district" />
            </CustomGrid>
            <CustomSubmitButton
              disabled={CreateCustomerMutation.isPending || EditCustomerMutation.isPending}
              name={
                CreateCustomerMutation.isPending || EditCustomerMutation.isPending
                  ? 'Loading'
                  : `${!isEdit ? 'Create' : 'Update'} Customer`
              }
            />{' '}
          </CustomContainerGrid>
        </FormProvider>
      )}
    </Container>
  );
}
