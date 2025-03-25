import { Helmet } from 'react-helmet-async';

import EditId from 'src/zustand/EditId';

import MaintenanceDetailedView from 'src/sections/products/view/maintenance-detailed-view';

// ----------------------------------------------------------------------

export default function MaintenanceDetailedPage() {
  const editId = EditId((state) => state.id);

  return (
    <>
      <Helmet>
        <title> Cars | U-DRIVE</title>
      </Helmet>

      <MaintenanceDetailedView editId={editId} />
    </>
  );
}
