import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink, sx, ...other }, ref) => {
  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = <Box component="img" src="/assets/logo.png" className="w-44  pb-5 pt-8" />;

  if (disabledLink) {
    return <div className="w-full  flex justify-center ">{logo}</div>;
  }

  return (
    <div className="w-full  flex justify-center ">
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    </div>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
