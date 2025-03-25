import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import CustomBreadCrumps from 'src/components/custom-made/CustomBreadCrumps';

import { CarsCreate } from 'src/sections/cars/view';

// ----------------------------------------------------------------------

export default function CreateCars() {
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
        <title> Cars | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText={`${!isEdit ? 'Create' : 'Update'} Car`}
        icon1={navIconsDualtonned[3]?.icon}
        icon2={navIconsDualtonned[2]?.submenu[0]?.icon}
        subname1="Cars"
        subname2={`${!isEdit ? 'Create' : 'Update'} Car`}
        redirectlink="/cars/list"
        buttonName="Cars list"
        redirectIcon="ph:list-bold"
      />
      <CarsCreate isEdit={isEdit} />
    </>
  );
}
