import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import CustomBreadCrumps from 'src/components/custom-made/CustomBreadCrumps';

import { EmployeesCreate } from 'src/sections/employees/view';

// ----------------------------------------------------------------------
console.log(NavIconsDualtonned);
export default function CreateEmployees() {
  const navIconsDualtonned = NavIconsDualtonned();
  console.log(navIconsDualtonned);
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
        <title> Employees | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText={`${!isEdit ? 'Create' : 'Update'} Employee`}
        icon1={navIconsDualtonned[4]?.icon}
        icon2={navIconsDualtonned[4]?.submenu[0]?.icon}
        subname1="Employees"
        subname2={`${!isEdit ? 'Create' : 'Update'} Employee`}
        redirectlink="/employee/list"
        buttonName="Employees list"
        redirectIcon="ph:list-bold"
      />
      <EmployeesCreate isEdit={isEdit} />
    </>
  );
}
