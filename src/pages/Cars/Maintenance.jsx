import { Helmet } from 'react-helmet-async';

import { CustomBreadCrumps } from 'src/components/custom-made';
import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function Maintenance() {
  const navIconsDualtonned = NavIconsDualtonned();

  return (
    <>
      <Helmet>
        <title> Cars | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText="Cars Maintenance"
        icon1={navIconsDualtonned[3]?.icon}
        icon2={navIconsDualtonned[3]?.submenu[2]?.icon}
        subname1="Cars"
        subname2="Maintenance"
        redirectlink="/cars/create"
        // buttonName="Cars create"
        redirectIcon="eva:plus-fill"
      />
      <ProductsView />
    </>
  );
}
