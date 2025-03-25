import { Helmet } from 'react-helmet-async';

import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import CustomBreadCrumps from 'src/components/custom-made/CustomBreadCrumps';

import { BookingListView } from 'src/sections/bookings/view';

// ----------------------------------------------------------------------

export default function ListEmployee() {
  const navIconsDualtonned = NavIconsDualtonned();

  return (
    <>
      <Helmet>
        <title> Bookings | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText="Bookings list"
        icon1={navIconsDualtonned[2]?.icon}
        icon2={navIconsDualtonned[2]?.submenu[1]?.icon}
        subname1="Booking"
        subname2="List Booking"
        redirectlink="/booking/create"
        buttonName="Booking create"
        redirectIcon="eva:plus-fill"
      />
      <BookingListView />
    </>
  );
}
