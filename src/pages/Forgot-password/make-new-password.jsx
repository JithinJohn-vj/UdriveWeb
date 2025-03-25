import { Helmet } from 'react-helmet-async';

import { MakeNewPasswordView } from 'src/sections/forgot-password';
// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Forgot-password | U-DRIVE </title>
      </Helmet>

      <MakeNewPasswordView />
    </>
  );
}
