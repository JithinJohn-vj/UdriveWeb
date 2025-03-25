import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import CustomBreadCrumps from 'src/components/custom-made/CustomBreadCrumps';

import { BookingCreate } from 'src/sections/bookings/view';

// ----------------------------------------------------------------------

export default function CreateBookings() {
  const navIconsDualtonned = NavIconsDualtonned();
  const [isEdit, setIsEdit] = useState(false);
  const [isInvoice, setIsInvoice] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.href;
    const isEditd = currentUrl.includes('edit');
    const isInvoicee = currentUrl.includes('invoice');

    if (isEditd) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }

    if (isInvoicee) {
      setIsInvoice(true);
    } else {
      setIsInvoice(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);
  return (
    <>
      <Helmet>
        <title> Bookings | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText={isInvoice ? 'Generate Invoice' : `${!isEdit ? 'Create' : 'Update'} Booking`}
        icon1={navIconsDualtonned[1]?.icon}
        icon2={navIconsDualtonned[1]?.submenu[0]?.icon}
        subname1="Booking"
        subname2={isInvoice ? 'Generate Invoice' : `${!isEdit ? 'Create' : 'Update'} Booking`}
        redirectlink="/booking/list"
        buttonName="Booking list"
        redirectIcon="ph:list-bold"
      />
      <BookingCreate isEdit={isEdit} isInvoice={isInvoice} />
    </>
  );
}
