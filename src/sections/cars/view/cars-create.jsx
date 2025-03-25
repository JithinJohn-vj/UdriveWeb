import dayjs from 'dayjs';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@mui/material/Container';
// Import TextField component
import { Grid, InputLabel } from '@mui/material';

import EditId from 'src/zustand/EditId';
import { useGetCarssById } from 'src/api/cars/Queries';
import { useEditCars, useCreateCars } from 'src/api/cars/Mutations';

import CustomGrid from 'src/components/custom-made/CustomGrid';
import AvatarUpload from 'src/components/hook-form/RHFAvtarUpload';
import MultipleFileUpload from 'src/components/hook-form/RHFMultiFileUpload';
import CustomSubmitButton from 'src/components/custom-made/CustomSubmitButton';
import { RHFSelect, FormProvider, RHFTextField, RHFDatePicker } from 'src/components/hook-form';

CarsCreate.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};
export default function CarsCreate({ isEdit }) {
  // const isWeekend = (date) => {
  //   console.log(date);
  //   if (date?.year() === 2024 && date.month() === 2) {
  //     if (date.date() === 19 || date.date() === 20) {
  //       return true;
  //     }
  //   }

  //   const day = date.day();
  //   return day === 0 || day === 6;
  // };
  // const forbiddenDates = [new Date(2024, 2, 19), new Date(2024, 2, 20)]; // Array of forbidden dates

  const editId = EditId((state) => state.id);
  const CreateCarsMutation = useCreateCars();
  const EditCarsMutation = useEditCars();
  const singleCustomerQuery = useGetCarssById(editId);
  const [editableData, setEditableData] = useState(null);
  const fuel_types = [
    { value: 'diesel', label: 'Diesel' },
    { value: 'petrol', label: 'Petrol' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'plug-in-hybrid', label: 'Plug-in Hybrid' },
    { value: 'hydrogen-fuel-cell', label: 'Hydrogen Fuel Cell' },
    { value: 'natural-gas', label: 'Natural Gas' },
  ];

  const transmission_type = [
    { value: 'automatic', label: 'Automatic' },
    { value: 'manual', label: 'Manual' },
    { value: 'cvt', label: 'CVT (Continuously Variable Transmission)' },
    { value: 'dct', label: 'DCT (Dual Clutch Transmission)' },
    { value: 'amt', label: 'AMT (Automated Manual Transmission)' },
    { value: 'semiautomatic', label: 'Semi-Automatic' },
  ];

  const validationSchema = yup.object().shape({
    name: yup.string().required('Model/car name is required'),
    manufacturingCompany: yup.string().required('Manufacturing company is required'),
    yearOfManufacturing: yup.string().required('Manufacturing year is required'),
    vehicleNumber: yup.string().required('Vehicle number is required'),
    fuelType: yup.string().required('Fuel type is required'),
    transmission: yup.string().required('Transmission type is required'),
    serviceInterval: yup.number().required('Service interval is required'),
    insurance: yup.date().required('Date is required'),
    lastService: yup.date().required('Date is required'),
    pollution: yup.date().required('Pollution  is required'),
    totalKmCovered: yup.number().required('Kilometers covered  is required'),
    // insurance: yup
    //   .date()
    //   .min(new Date(), 'Start date must be in the future')
    //   .test(
    //     'not-forbidden-dates',
    //     'Redemption cannot start on the already booked dates',
    //     (value) =>
    //       !forbiddenDates.some(
    //         (forbiddenDate) =>
    //           value.getDate() === forbiddenDate.getDate() &&
    //           value.getMonth() === forbiddenDate.getMonth() &&
    //           value.getFullYear() === forbiddenDate.getFullYear()
    //       )
    //   ),
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

  
  const convertBlobsToBase64 = async (files) => {
    const base64Files = await Promise.all(
      files.map(async (file) => {
        if (file.url.startsWith('blob:')) {
          // Convert blob URL to Base64
          const response = await fetch(file.url);
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                ...file,
                url: reader.result, // Base64 string
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        }
        return file; // Keep original if not a blob URL
      })
    );
  
    return base64Files;
  };
  useEffect(() => {
    if (singleCustomerQuery.status === 'success' && isEdit) {
      console.log(singleCustomerQuery.data);
      setEditableData(singleCustomerQuery.data);

      const defaults = {
        _id: singleCustomerQuery?.data?._id,
        name: singleCustomerQuery?.data?.name,
        manufacturingCompany: singleCustomerQuery?.data?.manufacturingCompany,
        transmission: singleCustomerQuery?.data?.transmission,
        yearOfManufacturing: singleCustomerQuery?.data?.yearOfManufacturing,
        fuelType: singleCustomerQuery?.data?.fuelType,
        serviceInterval: singleCustomerQuery?.data?.serviceInterval,
        vehicleNumber: singleCustomerQuery?.data?.vehicleNumber,
        insurance: dayjs(singleCustomerQuery?.data?.insurance),
        lastService: dayjs(singleCustomerQuery?.data?.lastService),
        pollution: dayjs(singleCustomerQuery?.data?.pollution),
        totalKmCovered: singleCustomerQuery?.data?.totalKmCovered,
      };
      reset(defaults);
    } else {
      reset({
        name: '',
      });
      console.log('first');
      setRcBook(null);
      setInsurance(null);
      setPollution(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleCustomerQuery?.status === 'success', reset, isEdit, editableData]);
  const [rcBook, setRcBook] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [pollution, setPollution] = useState(null);
  const [carImage, setCarImage] = useState();

  const onSubmit = (data) => {
    if (isEdit) {
      const values = {
        ...data,
        carImage: carImage || editableData.carImage,
        rcBook: rcBook || editableData.rcBook,
        insurancePolicy: insurance || editableData.insurancePolicy,
        pollutionCertificate: pollution || editableData.pollutionCertificate,
      };
      EditCarsMutation.mutate(values);
    } else {
      const values = {
        ...data,
        rcBook,
        carImage,
        insurancePolicy: insurance,
        pollutionCertificate: pollution,
      };
      CreateCarsMutation.mutate(values);
    }
  };

  const handleFilesChangeRC = async(files) => {
    console.log('Updated Files:', files);
    const updatedFiles = await convertBlobsToBase64(files);
    console.log(updatedFiles);
    const urls = updatedFiles.map(file => file.url);
    setRcBook(urls);
  };
  const handleFilesChangePOLLUTION = async(files) => {
    console.log('Updated Files:', files);
    const updatedFiles = await convertBlobsToBase64(files);
    console.log(updatedFiles);
    const urls = updatedFiles.map(file => file.url);
    setPollution(urls);
  };
  const handleFilesChangeINSURANCE = async(files) => {
    console.log('Updated Files:', files);
    const updatedFiles = await convertBlobsToBase64(files);
    console.log(updatedFiles);
    const urls = updatedFiles.map(file => file.url);
    setInsurance(urls);
  };
  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} alignItems="center">
          <CustomGrid layout={[12, 6]}>
            <AvatarUpload
              variant="square"
              cloudinaryLink={isEdit && editableData?.carImage}
              label="Car Image"
              w="380px"
              h="100%"
              isEdit={isEdit}
              accept="image/*, application/pdf"
              name="carImage"
              onChange={(files) => {
                console.log(files);
                const file = files;
                console.log(file);
                const reader = new FileReader();
                console.log(reader);
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  console.log(reader);
                  setCarImage(reader.result);
                };
              }}
            />
          </CustomGrid>
          <Grid item xs={12} md={6}>
            <div style={{ marginBottom: '1.3rem' }}>
              <RHFTextField name="name" label="model/name" />
            </div>
            <div style={{ marginBottom: '1.3rem' }}>
              <RHFTextField name="manufacturingCompany" label="Manufacturing company" />
            </div>
            <div>
              <RHFTextField name="totalKmCovered" label="Total kilometers covered" />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="yearOfManufacturing" label="Year of manufacturing " />
          </Grid>
          <CustomGrid layout={[12, 6]}>
            <RHFTextField name="vehicleNumber" label="Vehicle number" />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <RHFSelect
              label="Select fuel type"
              name="fuelType"
              control={control}
              errors={errors}
              menuItems={fuel_types}
            />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <RHFSelect
              label="Transmission type"
              name="transmission"
              control={control}
              errors={errors}
              menuItems={transmission_type}
            />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <RHFDatePicker
              name="insurance"
              label="Insurance due date"
              type="datetime-local"
              // disabledDates={isWeekend}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: errors.insurance !== undefined,
                  helperText: errors.insurance?.message || '',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <RHFDatePicker
              name="pollution"
              label="Pollution due date"
              type="datetime-local"
              // disabledDates={isWeekend}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: errors.insurance !== undefined,
                  helperText: errors.insurance?.message || '',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <RHFDatePicker
              name="lastService"
              label="Last service on"
              type="datetime-local"
              // disabledDates={isWeekend}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: errors.lastService !== undefined,
                  helperText: errors.lastService?.message || '',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            {/* <RHFSelect
              label="Service Interval"
              name="serviceInterval"
              control={control}
              errors={errors}
              menuItems={serviceInterval}
            /> */}
            <RHFTextField
              type="number"
              name="serviceInterval"
              label="Service Interval (In Kilometers)"
            />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <InputLabel id="demo-simple-select-label">Rc book</InputLabel>
            {/* <SingleFileUpload
              cloudinaryLink={isEdit && editableData?.rcBook}
              label="Upload Rc"
              isEdit={!isEdit}
              accept="image/*, application/pdf"
              name="rcBook"
              onChange={(files) => {
                const file = files[0];
                console.log(file);
                const reader = new FileReader();
                console.log(reader);
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  setRcBook(reader.result);
                };
              }}
            /> */}

            {/* <MultipleFileUpload
              cloudinaryLink={isEdit && editableData?.rcBook}
              label="Upload Rc"
              isEdit={!isEdit}
              accept="image/*, application/pdf"
              name="rcBook"
              onChange={(files) => {
                const file = files[0];
                console.log(file);
                const reader = new FileReader();
                console.log(reader);
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  setRcBook(reader.result);
                };
              }}
            /> */}

            <MultipleFileUpload
              label="Upload Files"
              name="upload"
              isEdit={!isEdit}
              cloudinaryLink={isEdit && editableData?.rcBook}
              onChange={handleFilesChangeRC}
              errors={errors}
            />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <InputLabel id="demo-simple-select-label">Insurance</InputLabel>
            <MultipleFileUpload
              label="Upload Files"
              name="uploadpdf"
              isEdit={!isEdit}
              cloudinaryLink={isEdit && editableData?.insurancePolicy}
              onChange={handleFilesChangeINSURANCE}
              errors={errors}
            />
            {/* <SingleFileUpload
cloudinaryLink={isEdit && editableData?.insurancePolicy?.length > 0 ? editableData.insurancePolicy[0] : undefined}
label="Upload PDF"
              isEdit={!isEdit}
              accept="image/*, application/pdf"
              name="insurancePolicy"
              onChange={(files) => {
                const file = files[0];
                console.log(file);
                const reader = new FileReader();
                console.log(reader);
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  console.log(reader.result)

                  setInsurance([reader.result]);
                };
              }}
            /> */}
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <InputLabel id="demo-simple-select-label">Pollution</InputLabel>
            <MultipleFileUpload
              label="Upload Files"
              name="pollutionCertificate"
              isEdit={!isEdit}
              cloudinaryLink={isEdit && editableData?.pollutionCertificate}
              onChange={handleFilesChangePOLLUTION}
              errors={errors}
            />
            {/* <SingleFileUpload
              cloudinaryLink={isEdit && editableData?.pollutionCertificate}
              label="Upload PDF"
              isEdit={!isEdit}
              accept="image/*, application/pdf"
              name="pollutionCertificate"
              onChange={(files) => {
                const file = files[0];
                console.log(file);
                const reader = new FileReader();
                console.log(reader);
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  setPollution(reader.result);
                };
              }}
            /> */}
          </CustomGrid>
          <CustomSubmitButton
            disabled={EditCarsMutation.isPending || CreateCarsMutation.isPending}
            name={
              EditCarsMutation.isPending || CreateCarsMutation.isPending
                ? 'Loading'
                : `${!isEdit ? 'Create' : 'Update'} Car`
            }
          />{' '}
        </Grid>
      </FormProvider>
    </Container>
  );
}
