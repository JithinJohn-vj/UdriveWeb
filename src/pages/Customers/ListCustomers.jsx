import { Helmet } from 'react-helmet-async';

import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import CustomBreadCrumps from 'src/components/custom-made/CustomBreadCrumps';

import { CustomersListView } from 'src/sections/customers/view';
// ----------------------------------------------------------------------

export default function ListCustomers() {
  const navIconsDualtonned = NavIconsDualtonned();
  return (
    <>
      <Helmet>
        <title> Customers | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText="Customers list"
        icon1={navIconsDualtonned[2]?.icon}
        icon2={navIconsDualtonned[2]?.submenu[1]?.icon}
        subname1="Customers"
        subname2="List Customers"
        redirectlink="/customers/create"
        buttonName="Customer create"
        redirectIcon="eva:plus-fill"
      />
      <CustomersListView />
    </>
  );
}
