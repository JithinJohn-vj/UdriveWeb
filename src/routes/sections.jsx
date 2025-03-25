import { lazy, Suspense, useState, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import UserCredentials from 'src/zustand/UserCredentials';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const MaintenancePage = lazy(() => import('src/pages/Cars/Maintenance'));
export const MaintenanceDetailedPage = lazy(() => import('src/pages/Cars/MaintenanceDetailed'));

export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const EmployeeListPage = lazy(() => import('src/pages/Employees/ListEmployees'));
export const EmployeeCreatePage = lazy(() => import('src/pages/Employees/CreateEmployees'));
export const CarsCreatePage = lazy(() => import('src/pages/Cars/CreateCars'));
export const CarsListPage = lazy(() => import('src/pages/Cars/ListCars'));
export const BookingsCreatePage = lazy(() => import('src/pages/Bookings/CreateBookings'));
export const BookingsListPage = lazy(() => import('src/pages/Bookings/ListBookings'));
export const CustomersCreatePage = lazy(() => import('src/pages/Customers/CreateCustomers'));
export const CustomersListPage = lazy(() => import('src/pages/Customers/ListCustomers'));
export const CalenderItems = lazy(() => import('src/pages/Calendar/Calender'));
export const ForgotPassword = lazy(() => import('src/pages/Forgot-password/forgot-pass'));
export const MakeNewPassword = lazy(() => import('src/pages/Forgot-password/make-new-password'));

export const Settings = lazy(() => import('src/pages/settings'));

// ----------------------------------------------------------------------

export default function Router() {
  const [acess, setAcess] = useState(['fleet', 'customer', 'reminder', 'booking']);
  const userData = UserCredentials((state) => state.user);

  useEffect(() => {
    if (userData && userData.user && userData.user.access) {
      const accessValues = userData.user.access.map((m) => m.value);
      setAcess(accessValues);
    }
  }, [userData]);
  console.log(acess);
  const showCarsRoute = acess.includes('fleet');
  const showCustomerRoute = acess.includes('customer');
  const showBookingRoute = acess.includes('booking');
  // const showReminderRoute = acess.includes('reminder');

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'settings', element: <Settings /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <MaintenancePage /> },
        { path: 'blog', element: <BlogPage /> },
        {
          path: 'employee',
          children: [
            {
              path: 'list',
              element: <EmployeeListPage />,
            },
            {
              path: 'create',
              element: <EmployeeCreatePage />,
            },
            {
              path: 'edit',
              element: <EmployeeCreatePage />,
            },
          ],
        },
        {
          path: 'customers',
          ...(showCustomerRoute && {
            children: [
              {
                path: 'list',
                element: <CustomersListPage />,
              },
              {
                path: 'create',
                element: <CustomersCreatePage />,
              },
              {
                path: 'edit',
                element: <CustomersCreatePage />,
              },
            ],
          }),
        },
        {
          path: 'cars',
          ...(showCarsRoute && {
            children: [
              {
                path: 'list',
                element: <CarsListPage />,
              },
              {
                path: 'create',
                element: <CarsCreatePage />,
              },
              {
                path: 'edit',
                element: <CarsCreatePage />,
              },
              {
                path: 'maintenance',
                element: <MaintenancePage />,
              },
              {
                path: 'maintenance-detailed',
                element: <MaintenanceDetailedPage />,
              },
            ],
          }),
        },
        {
          path: 'calendar',
          children: [
            {
              path: 'create',
              element: <CalenderItems />,
            },
          ],
        },
        {
          path: 'booking',
          ...(showBookingRoute && {
            children: [
              {
                path: 'list',
                element: <BookingsListPage />,
              },
              {
                path: 'create',
                element: <BookingsCreatePage />,
              },
              {
                path: 'edit',
                element: <BookingsCreatePage />,
              },
              {
                path: 'invoice',
                element: <BookingsCreatePage />,
              },
            ],
          }),
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'reset-password/:id*',
      element: <MakeNewPassword />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
