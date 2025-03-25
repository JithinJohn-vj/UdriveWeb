// import { Helmet } from 'react-helmet-async';
// import { ForgotPasswordView } from 'src/sections/forgot-password';
// // ----------------------------------------------------------------------

// export default function LoginPage() {
//   return (
//     <>
//       <Helmet>
//         <title> reset-password | U-DRIVE </title>
//       </Helmet>

//       <ForgotPasswordView />
//     </>
//   );
// }

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import CustomBreadCrumps from 'src/components/custom-made/CustomBreadCrumps';

import { Settings } from 'src/sections/settings';

// ----------------------------------------------------------------------

export default function SettingsPage() {
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
        <title> Reset-Password | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText="Settings"
        icon1={navIconsDualtonned[0]?.icon}
        icon2={navIconsDualtonned[6]?.icon}
        subname1="Dashboard"
        subname2="Settings"
        redirectlink="/cars/list"
        redirectIcon="ph:list-bold"
      />
      <Settings isEdit={isEdit} />
    </>
  );
}
