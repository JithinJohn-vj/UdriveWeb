import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import CustomBreadCrumps from 'src/components/custom-made/CustomBreadCrumps';

import { CustomersCreate } from 'src/sections/customers/view';

// ----------------------------------------------------------------------

export default function CreateEmployees() {
  const navIconsDualtonned = NavIconsDualtonned();
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const currentUrl = window.location.href;
    const isEditd = currentUrl.includes('edit');
    if (isEditd) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);
  return (
    <>
      <Helmet>
        <title> Customers | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText={`${!isEdit ? 'Create' : 'Update'} Customer`}
        icon1={navIconsDualtonned[2]?.icon}
        icon2={navIconsDualtonned[2]?.submenu[0]?.icon}
        subname1="Customers"
        subname2={`${!isEdit ? 'Create' : 'Update'} Customer`}
        redirectlink="/customers/list"
        buttonName="Customers list"
        redirectIcon="ph:list-bold"
      />
      <CustomersCreate isEdit={isEdit} />
    </>
  );
}
