/* eslint-disable */

import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';
import { useThemeStore } from 'src/zustand/themeStore';
import { useGetCarsServiceDue, useGetCarsInsuranceDue, useGetPollutionNotifications } from 'src/api/cars/Queries';

import Iconify from 'src/components/iconify';

import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import NotificationsPopover from './common/notifications-popover';
// import LanguagePopover from './common/language-popover';

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const { darkMode, toggleDarkMode } = useThemeStore();
  const getCarsServiceDue = useGetCarsServiceDue();
  const getPollutionDueNotify=useGetPollutionNotifications()

  const getCarInsuranceDue = useGetCarsInsuranceDue();
  console.log(getCarsServiceDue);
  console.log(getCarInsuranceDue);
  console.log(getPollutionDueNotify)
  // State variable to track fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };
  const [status, setStatus] = useState([]);
  const SOCKET_SERVER_URL = 'https://udrive-server-ts-2.onrender.com';
  const socketBookings = [];
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on('connect', () => {
      console.log('Connected to server');
    });
    // booking
    socket.on('newBooking', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
    // service
    socket.on('serviceBefore2000', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
    socket.on('serviceBefore1000', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
    socket.on('serviceBefore500', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
    socket.on('serviceDueReached', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
    // insurance
    socket.on('insuranceBefore10', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
    socket.on('insuranceBefore5', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
    socket.on('insuranceOver', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
    //pollution
    socket.on('pollutionBefore10', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
    socket.on('pollutionBefore5', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
    socket.on('pollutionOver', (message) => {
      console.log('Received status:', message);
      socketBookings.push(message);
      setStatus(socketBookings);
    });
   
  }, []);

  console.log(socketBookings);

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Fullscreen toggle button */}
        <IconButton onClick={toggleFullscreen}>
          {isFullscreen ? <Iconify icon="bi:fullscreen-exit" /> : <Iconify icon="bi:fullscreen" />}
        </IconButton>
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? <Iconify icon="bi:moon-fill" /> : <Iconify icon="bi:sun-fill" />}
        </IconButton>
        <NotificationsPopover status={status} />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
