import React, { useState, useEffect } from 'react';

import UserCredentials from 'src/zustand/UserCredentials';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const NavConfig = () => {
  const [access, setAccess] = useState(['fleet', 'customer', 'reminder', 'booking']);
  const userData = UserCredentials((state) => state.user);

  useEffect(() => {
    if (userData && userData.user && userData.user.access) {
      const accessValues = userData.user.access.map((m) => m.value);
      setAccess(accessValues);
    }
  }, [userData]);

  const showCarsRoute = access.includes('fleet');
  const showCustomerRoute = access.includes('customer');
  const showBookingRoute = access.includes('booking');
  // const showReminderRoute = access.includes('reminder');

  const navConfig = [
    {
      title: 'dashboard',
      path: '/',
      icon: icon('ic_analytics'),
    },
    ...(showBookingRoute
      ? [
          {
            title: 'Bookings',
            icon: icon('ic_b'),
            submenu: [
              {
                title: 'Create Booking',
                path: '/booking/create',
                icon: icon('ic_create'),
              },
              {
                title: 'Booking List ',
                path: '/booking/list',
                icon: icon('ic_list'),
              },
            ],
          },
        ]
      : []),
    ...(showCustomerRoute
      ? [
          {
            title: 'Customers',
            icon: icon('ic_customers'),
            submenu: [
              {
                title: 'Create Customers',
                path: '/customers/create',
                icon: icon('ic_create'),
              },
              {
                title: 'Customers List ',
                path: '/customers/list',
                icon: icon('ic_list'),
              },
            ],
          },
        ]
      : []),
    ...(showCarsRoute
      ? [
          {
            title: 'Cars',
            icon: icon('ic_car'),
            submenu: [
              {
                title: 'Create Cars',
                path: '/cars/create',
                icon: icon('ic_create'),
              },
              {
                title: 'Cars List',
                path: '/cars/list',
                icon: icon('ic_list'),
              },
              {
                title: 'Maintenance',
                path: '/cars/maintenance',
                icon: icon('lock'),
              },
            ],
          },
        ]
      : []),

    {
      title: 'Employees',
      icon: icon('ic_admin'),
      submenu: [
        {
          title: 'Create Employee',
          path: '/employee/create',
          icon: icon('ic_create'),
        },
        {
          title: 'Employees List ',
          path: '/employee/list',
          icon: icon('ic_list'),
        },
      ],
    },
    {
      title: 'Calendar',
      path: '/calendar/create',
      icon: icon('ic_calendar'),
    },
  ];

  return navConfig;
};

export default NavConfig;
