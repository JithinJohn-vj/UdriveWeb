// import navConfig from 'src/layouts/dashboard/config-navigation';

// export const NavIconsDualtonned = {
//   analytics: navConfig[0].icon,
//   addIcon: navConfig[4].submenu[0].icon,
//   listIcon: navConfig[4].submenu[1].icon,
//   employees: navConfig[4].icon,
//   cars: navConfig[3].icon,
//   customers: navConfig[2].icon,
//   Booking: navConfig[1].icon,
//   calendar: navConfig[5].icon,

// };

// // NavConfig.js
// import React, { useState, useEffect } from 'react';
// import SvgColor from 'src/components/svg-color';
// import UserCredentials from 'src/zustand/UserCredentials';

// // ----------------------------------------------------------------------
// import NavConfig from 'src/layouts/dashboard/config-navigation';

// const NavIconsDualtonned = () => {
//   const navItems = NavConfig() || []; // Provide an empty array as default if NavConfig returns undefined
//   const navIconsDualtonned = {
//     analytics: navItems[0]?.icon || null, // Provide a default value if navItems[0] is undefined
//     addIcon: navItems[4]?.submenu?.[0]?.icon || null, // Check if submenu and its items exist
//     listIcon: navItems[4]?.submenu?.[1]?.icon || null,
//     employees: navItems[4]?.icon || null,
//     cars: navItems[3]?.icon || null,
//     customers: navItems[2]?.icon || null,
//     Booking: navItems[1]?.icon || null,
//     calendar: navItems[5]?.icon || null,
//   };

//   return navIconsDualtonned;
// };

// export default NavIconsDualtonned;

import React from 'react';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const NavIconsDualtonned = () => {
  const navIconsDualtonned = [
    {
      title: 'dashboard',
      path: '/',
      icon: icon('ic_analytics'),
    },
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
          title: 'List Booking',
          path: '/booking/list',
          icon: icon('ic_list'),
        },
      ],
    },
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
          title: 'List Customers',
          path: '/customers/list',
          icon: icon('ic_list'),
        },
      ],
    },
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
          title: 'List Cars',
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
          title: 'List Employees',
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
    {
      title: 'forgot-pass',
      path: '/forgot-pass',
      icon: icon('ic_settings'),
    },
    {
      title: 'cr',
      path: '/fcr',
      icon: icon('ic_carpop'),
    },
  ];

  return navIconsDualtonned;
};

export default NavIconsDualtonned;
