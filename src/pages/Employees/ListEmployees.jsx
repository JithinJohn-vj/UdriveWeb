import { Helmet } from 'react-helmet-async';

import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import CustomBreadCrumps from 'src/components/custom-made/CustomBreadCrumps';

import { EmployeesListView } from 'src/sections/employees/view';

// ----------------------------------------------------------------------

export default function ListEmployees() {
  const navIconsDualtonned = NavIconsDualtonned();

  return (
    <>
      <Helmet>
        <title> Employees | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText="Employees list"
        icon1={navIconsDualtonned[4]?.icon}
        icon2={navIconsDualtonned[4]?.submenu[1]?.icon}
        subname1="Employees"
        subname2="List Employees"
        redirectlink="/employee/create"
        buttonName="Employee create"
        redirectIcon="eva:plus-fill"
      />
      <EmployeesListView />
    </>
  );
}
