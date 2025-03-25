import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '@mui/material/Container';
// Import TextField component

import { useState, useEffect } from 'react';

import EditId from 'src/zustand/EditId';
import { useGetEmployeeById } from 'src/api/employees/Queries';
import { useEditEmployees, useCreateEmployees } from 'src/api/employees/Mutations';

import CustomGrid from 'src/components/custom-made/CustomGrid';
import AvatarUpload from 'src/components/hook-form/RHFAvtarUpload';
import RHFPasswordField from 'src/components/hook-form/RHFPasswordField';
import CustomSubmitButton from 'src/components/custom-made/CustomSubmitButton';
import CustomContainerGrid from 'src/components/custom-made/CustomContainerGrid';
import { RHFSelect, FormProvider, RHFTextField, RHFMultiCheckbox } from 'src/components/hook-form';

// ----------------------------------------------------------------------
EmployeeCreate.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};
export default function EmployeeCreate({ isEdit }) {
  const editId = EditId((state) => state.id);
  const CreateEmployeeMutation = useCreateEmployees();
  const EditEmployeeMutation = useEditEmployees();
  const singleEmployeeQuery = useGetEmployeeById(editId);
  const [employeeImage, setEmployeeImage] = useState();
  const [editableData, setEditableData] = useState();
  console.log(singleEmployeeQuery);
  const validationSchema = yup.object().shape({
    name: yup.string().required('First name is required'),
    email: yup.string().required('Email is required'),
    // password: yup.string().required('Password is required'),
    userName: yup
      .string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters long')
      .max(20, 'Username cannot be longer than 20 characters')
      .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    role: yup.string().required('Role is required'),
    access: yup.array().min(1, 'Please select at least one option'),
  });
  const AccessSections = [
    { title: 'Fleet Management', value: 'fleet' },
    { title: 'Customer Management', value: 'customer' },
    { title: 'Booking Management', value: 'booking' },
    { title: 'Reminder Management', value: 'reminder' },
  ];

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

  useEffect(() => {
    if (singleEmployeeQuery.status === 'success' && isEdit) {
      console.log(singleEmployeeQuery.data);
      setEditableData(singleEmployeeQuery.data);
      reset(singleEmployeeQuery.data);
    } else {
      reset({
        name: '',
      });
      setEmployeeImage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleEmployeeQuery?.status === 'success', reset, isEdit]);

  const onSubmit = (data) => {
    if (isEdit) {
      console.log('first');
      const values = {
        ...data,
        employeeImage,
      };
      console.log(values);
      EditEmployeeMutation.mutate(values);
    } else {
      console.log('first');
      const values = {
        ...data,
        employeeImage,
      };
      CreateEmployeeMutation.mutate(values);
    }
    console.log(data);
  };

  const role_types = [{ value: 'admin', label: 'Admin' }];

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <CustomContainerGrid>
          <CustomGrid layout={[12, 6]}>
            <AvatarUpload
              cloudinaryLink={isEdit && editableData?.employeeImage}
              label="Employee Image"
              isEdit={isEdit}
              accept="image/*, application/pdf"
              name="employeeImage"
              onChange={(files) => {
                console.log(files);
                const file = files;
                console.log(file);
                const reader = new FileReader();
                console.log(reader);
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  console.log(reader);
                  setEmployeeImage(reader.result);
                };
              }}
            />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <RHFMultiCheckbox
              label="Allocate access to"
              name="access"
              errors={errors}
              options={AccessSections}
            />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <RHFTextField name="name" label="Name" />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <RHFTextField name="userName" label="User name" />
          </CustomGrid>
          <CustomGrid layout={[12, 6]}>
            <RHFTextField name="email" label="Email" />
          </CustomGrid>
          {!isEdit && (
            <CustomGrid layout={[12, 6]}>
              <RHFPasswordField name="password" label="Password" />
            </CustomGrid>
          )}
          {singleEmployeeQuery?.data?.role !== 'superAdmin' && (
            <CustomGrid layout={[12, 6]}>
              <RHFSelect
                label="Select role"
                name="role"
                control={control}
                errors={errors}
                menuItems={role_types}
              />
            </CustomGrid>
          )}

          <CustomSubmitButton
            disabled={CreateEmployeeMutation.isPending || EditEmployeeMutation.isPending}
            name={
              CreateEmployeeMutation.isPending || EditEmployeeMutation.isPending
                ? 'Loading'
                : `${!isEdit ? 'Create' : 'Update'} Employee`
            }
          />
        </CustomContainerGrid>
      </FormProvider>
    </Container>
  );
}
