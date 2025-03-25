import { Helmet } from 'react-helmet-async';

import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import CustomBreadCrumps from 'src/components/custom-made/CustomBreadCrumps';

import { CarsListView } from 'src/sections/cars/view';

// ----------------------------------------------------------------------

export default function ListCars() {
  const navIconsDualtonned = NavIconsDualtonned();

  return (
    <>
      <Helmet>
        <title> Cars | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText="Cars list"
        icon1={navIconsDualtonned[3]?.icon}
        icon2={navIconsDualtonned[2]?.submenu[1]?.icon}
        subname1="Cars"
        subname2="List Cars"
        redirectlink="/cars/create"
        buttonName="Cars create"
        redirectIcon="eva:plus-fill"
      />
      <CarsListView />
    </>
  );
}
