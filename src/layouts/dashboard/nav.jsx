import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import { List, Collapse } from '@mui/material';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';
import UserCredentials from 'src/zustand/UserCredentials';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify/iconify';

import { NAV } from './config-layout';
import NavConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const userData = UserCredentials((state) => state.user);
  const upLg = useResponsive('up', 'lg');
  const navItems = NavConfig();
  console.log(userData);
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={userData?.user?.employeeImage?.url} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{userData?.user?.name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account?.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navItems.map((item) => (
        <NavItem key={item?.title} item={item} />
      ))}
    </Stack>
  );

  // const renderUpgrade = (
  //   <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
  //     <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
  //       <Box
  //         component="img"
  //         src="/assets/illustrations/illustration_avatar.png"
  //         sx={{ width: 100, position: 'absolute', top: -50 }}
  //       />

  //       <Box sx={{ textAlign: 'center' }}>
  //         <Typography variant="h6">Get more?</Typography>

  //         <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
  //           From only $69
  //         </Typography>
  //       </Box>

  //       <Button
  //         href="https://material-ui.com/store/items/minimal-dashboard/"
  //         target="_blank"
  //         variant="contained"
  //         color="inherit"
  //       >
  //         Upgrade to Pro
  //       </Button>
  //     </Stack>
  //   </Box>
  // );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

      {/* {renderUpgrade} */}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function SubMenu({ items }) {
  const pathname = usePathname();

  return (
    <List>
      {items.map((subItem) => {
        const subItemPath = subItem?.path;
        const subItemActive = subItemPath === pathname;

        return (
          <ListItemButton
            key={subItem?.title}
            component={RouterLink}
            href={subItemPath}
            sx={{
              minHeight: 44,
              borderRadius: 0.75,
              typography: 'body2',
              color: 'text.secondary',
              textTransform: 'capitalize',
              fontWeight: 'fontWeightMedium',
              ...(subItemActive && {
                color: 'primary.main',
                fontWeight: 'fontWeightSemiBold',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                },
              }),
            }}
          >
            <Box component="span" sx={{ width: 24, height: 24, mr: 2, ml: 3 }}>
              {subItem.icon}
            </Box>
            <Box component="span">{subItem.title}</Box>
          </ListItemButton>
        );
      })}
    </List>
  );
}

SubMenu.propTypes = {
  items: PropTypes.array,
};

function NavItem({ item }) {
  const pathname = usePathname();
  const active = item?.path === pathname;
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <ListItemButton
        onClick={handleToggleCollapse}
        component={RouterLink}
        href={item?.path}
        sx={{
          justifyContent: 'space-between', // Align items to the right end
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
          ...(active && {
            color: 'primary.main',
            fontWeight: 'fontWeightSemiBold',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }}
      >
        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
            {item?.icon}
          </Box>
          <Box component="span">{item?.title}</Box>
        </Box>
        {item?.submenu &&
          (collapsed ? (
            <Iconify icon="ic:baseline-expand-more" />
          ) : (
            <Iconify icon="ic:baseline-expand-less" />
          ))}
      </ListItemButton>

      <Collapse in={!collapsed}>{item?.submenu && <SubMenu items={item?.submenu} />}</Collapse>
    </div>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
