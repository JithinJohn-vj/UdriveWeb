/* eslint-disable */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from 'src/utils/format-time';

import { useMarkAllAsSeen } from 'src/api/bookings/Mutations';
import { useGetBoookingsMadeNotify } from 'src/api/bookings/Queries';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    booking: { fromDate: '10-05-2024 05:38 PM', toDate: '10-05-2024 05:40 PM' },
    employee: {
      employeeImage: {
        public_id: 'employees/hdtvvnxa2lihxzopr5jg',
        url: 'https://res.cloudinary.com/doiqxclym/image/upload/v1714990147/employees/hdtvvnxa2lihxzopr5jg.jpg',
      },
      _id: '6638ab910ee5d038269966fd',
      name: 'Test Account',
    },
    customer: {
      _id: '6638aefca1ea425cd54d0722',
      name: 'Rafael English',
      customerImage: {
        public_id: 'customers/lrydv6afxzwrx9sdtn7g',
        url: 'https://res.cloudinary.com/doiqxclym/image/upload/v1714990843/customers/lrydv6afxzwrx9sdtn7g.jpg',
      },
    },
    car: {
      carImage: {
        public_id: 'cars/wjidlgjuor66gyvslrn1',
        url: 'https://res.cloudinary.com/doiqxclym/image/upload/v1714990639/cars/wjidlgjuor66gyvslrn1.jpg',
      },
      _id: '6638ae30a1ea425cd54d0706',
      name: 'AMG',
    },
    currentDate: '2024-05-10T12:09:01.842Z',
    seen: false,
    _id: '663e0e5d023b7b8c3b31b151',
    __v: 0,
  },
];
// const NOTIFICATIONS = [
//   {
//     id: faker.string.uuid(),
//     title: 'Your order is placed',
//     description: 'waiting for shipping',
//     avatar: null,
//     type: 'order_placed',
//     createdAt: set(new Date(), { hours: 10, minutes: 30 }),
//     isUnRead: true,
//   },
//   {
//     id: faker.string.uuid(),
//     title: faker.person.fullName(),
//     description: 'answered to your comment on the Minimal',
//     avatar: '/assets/images/avatars/avatar_2.jpg',
//     type: 'friend_interactive',
//     createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
//     isUnRead: true,
//   },
//   {
//     id: faker.string.uuid(),
//     title: 'You have new message',
//     description: '5 unread messages',
//     avatar: null,
//     type: 'chat_message',
//     createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
//     isUnRead: false,
//   },
//   {
//     id: faker.string.uuid(),
//     title: 'You have new mail',
//     description: 'sent from Guido Padberg',
//     avatar: null,
//     type: 'mail',
//     createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
//     isUnRead: false,
//   },
//   {
//     id: faker.string.uuid(),
//     title: 'Delivery processing',
//     description: 'Your order is being shipped',
//     avatar: null,
//     type: 'order_shipped',
//     createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
//     isUnRead: false,
//   },
// ];

export default function NotificationsPopover({ status }) {
  const notfyFromBackend = useGetBoookingsMadeNotify();
  console.log(notfyFromBackend);
  console.log(status);
  console.log(status);
  // const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState(null);
  const [statusState, setStatusState] = useState(status); // State for status

  const markAllAsSeen = useMarkAllAsSeen();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  useEffect(() => {
    setStatusState(status);
  }, [status]);

  const handleClose = () => {
    setOpen(null);
  };

  // const handleMarkAllAsRead = () => {
  //   setNotifications(
  //     notifications.map((notification) => ({
  //       ...notification,
  //       isUnRead: false,
  //     }))
  //   );
  // };

  const totalUnRead = 4;

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge
          badgeContent={
            statusState?.length
              ? statusState.length + notfyFromBackend?.data?.length
              : notfyFromBackend?.data?.length || 0
          }
          color="error"
        >
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have{' '}
              {statusState?.length
                ? statusState.length + notfyFromBackend?.data?.length
                : notfyFromBackend?.data?.length || 0}{' '}
              unread messages
            </Typography>
          </Box>

          {statusState?.length > 0 || notfyFromBackend?.data?.length > 0 ? (
            <Tooltip
              onClick={() => {
                markAllAsSeen.mutate('m');
                setStatusState([]);
              }}
              title="Mark all as read"
            >
              <IconButton color="primary">
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          ) : null}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {statusState.length > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  new
                </ListSubheader>
              }
            >
              {statusState?.map((notification) => (
                <NotificationItem key={notification._id} notification={notification} />
              ))}
            </List>
          )}
          {notfyFromBackend?.data?.length > 0 ? (
            <List
              disablePadding
              subheader={
                <>
                  {statusState.length > 0 ? (
                    <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                      Before that
                    </ListSubheader>
                  ) : (
                    ''
                  )}
                </>
              }
            >
              {notfyFromBackend.data
                ?.sort((a, b) => new Date(b.currentDate) - new Date(a.currentDate))
                .map((notification) => (
                  <NotificationItem key={notification._id} notification={notification} />
                ))}
            </List>
          ) : (
            <>
              {statusState.length === 0 && (
                <ListSubheader
                  className="text-center"
                  disableSticky
                  sx={{ py: 4, px: 2.5, typography: 'overline' }}
                >
                  Notification empty
                </ListSubheader>
              )}
            </>
          )}
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            {/* View All */}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  console.log(notification);
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 0.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.currentDate)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  console.log(notification);
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === 'newBooking') {
    return {
      avatar: (
        <img
          className="rounded-full w-full h-full"
          alt={notification.title}
          src="/assets/icons/booking_made.PNG"
        />
      ),
      title,
    };
  }

  if (notification.type === 'insuranceOver') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/new/4.svg" />,

      title,
    };
  }
  if (notification.type === 'insuranceBefore10') {
    return {
      avatar: (
        <img className="p-1" alt={notification.title} src="/assets/icons/Insurance_exceed.svg" />
      ),
      title,
    };
  }
  if (notification.type === 'insuranceBefore5') {
    return {
      avatar: (
        <img className="p-1" alt={notification.title} src="/assets/icons/Insurance_exceed.svg" />
      ),
      title,
    };
  }
  if (notification.type === 'serviceBefore500') {
    return {
      avatar: <img className="p-1" alt={notification.title} src="/assets/icons/new/3.svg" />,
      title,
    };
  }
  if (notification.type === 'serviceBefore2000') {
    return {
      avatar: <img className="p-1" alt={notification.title} src="/assets/icons/new/3.svg" />,
      title,
    };
  }
  if (notification.type === 'serviceBefore1000') {
    return {
      avatar: <img className="p-1" alt={notification.title} src="/assets/icons/new/3.svg" />,
      title,
    };
  }
  if (notification.type === 'serviceDueReached') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/new/4.svg" />,
      title,
    };
  }


  if (notification.type === 'pollutionBefore10') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/new/9.svg" />,
      title,
    };
  }
  if (notification.type === 'pollutionBefore5') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/new/9.svg" />,
      title,
    };
  }
  if (notification.type === 'pollutionOver') {
    return {
      avatar: <img className="fill-white" alt={notification.title} src="/assets/icons/new/4.svg" />,
      title,
    };
  }


  




  if (!notification.type) {
    return {
      avatar: <img alt={notification.title} src={notification.employee.employeeImage?.url} />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
