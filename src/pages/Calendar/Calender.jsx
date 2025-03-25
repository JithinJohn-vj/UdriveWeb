import { Helmet } from 'react-helmet-async';

import NavIconsDualtonned from 'src/components/IconSvgs/NavIconsDualtonned';
import CustomBreadCrumps from 'src/components/custom-made/CustomBreadCrumps';

import { CalenderItems } from 'src/sections/calender-listings/view';

// ----------------------------------------------------------------------

export default function Calendar() {
  const navIconsDualtonned = NavIconsDualtonned();

  return (
    <>
      <Helmet>
        <title> Calendar | U-DRIVE</title>
      </Helmet>
      <CustomBreadCrumps
        headText="Calendar"
        icon1={navIconsDualtonned[5]?.icon}
        icon2={navIconsDualtonned[2]?.submenu[0]?.icon}
        subname1="Calendar"
        // subname2="Calendar"
        redirectlink="/booking/list"
        buttonName="Booking list"
        redirectIcon="ph:list-bold"
      />
      <CalenderItems />
    </>
  );
}
