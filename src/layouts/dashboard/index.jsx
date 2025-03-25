import { toast } from 'sonner';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { useRouter } from 'src/routes/hooks';

import { useGetLoggedInUser, useGetRefreshToken } from 'src/api/auth/Queries';

import Nav from './nav';
import Main from './main';
import Header from './header';

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const updateRefreshToken = useGetRefreshToken();
  const getLoggedInUser = useGetLoggedInUser();
  const router = useRouter();
  useEffect(() => {
    const handleNetworkChange = () => {
      if (!navigator.onLine) {
        router.push('/login');
        toast.error('network-error');
      }
    };

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    if (!navigator.onLine) {
      router.push('/login');
      toast.error('network-error');
    }
    if (getLoggedInUser.status === 'error' && router.pathname !== '/login') {
      router.push('/login');
    }

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLoggedInUser.status, router.pathname, updateRefreshToken]);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
