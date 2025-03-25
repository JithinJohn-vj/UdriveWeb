/* eslint-disable */
import { toast } from 'sonner';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import EditId from 'src/zustand/EditId';
import UserCredentials from 'src/zustand/UserCredentials';
import { toEmployeeEdit } from 'src/paths/ShowMeTheWayFrontend';
import { useBlockEmployees, useDeleteEmployees } from 'src/api/employees/Mutations';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomModal from 'src/components/custom-made/CustomModal';
import {
  blockMessages,
  unblockMessages,
  deleteEmployeeMessage,
} from 'src/components/messages/CustomModalMessages';

import UserDetailsModal from './view/employee-details-modal';

// ----------------------------------------------------------------------

export default function UserTableRow({
  setDataForPopup,
  id,
  selected,
  name,
  userName,
  email,
  role,
  bookings,
  employeeImage,
  access,
  isBlocked: initialIsBlocked,
  handleClick,
}) {
  console.log(employeeImage);
  const [open, setOpen] = useState(null);
  const [isBlocked, setIsBlocked] = useState(initialIsBlocked);
  const { user } = UserCredentials.getState();
  const currentRole = user?.user?.role;
  const CurrentUser = user?.user?._id;
  const router = useRouter();
  const deleteEmployeeMutation = useDeleteEmployees();
  const blockEmployeeMutation = useBlockEmployees();
  const [showModal, setShowModal] = useState(false);

  const handleViewMore = () => {
    setShowModal(true);
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteEmployee = (iddel) => {
    if (CurrentUser === iddel) {
      toast.error('self deletion not permitted');
    } else {
      deleteEmployeeMutation.mutate(iddel);
    }
    setOpen(null);
  };
  const handleEditMenu = (ids) => {
    EditId.setState({ id: ids });
    console.log(ids);
    router.push(toEmployeeEdit);
    setOpen(null);
  };

  const handleUnBlockUser = (idb) => {
    const data = {
      idb,
      blocked: false,
    };
    if (CurrentUser === idb) {
      toast.error('self block/unblock not permitted');
    } else {
      blockEmployeeMutation.mutate(data, {
        onSuccess: () => {
          setIsBlocked(false);
          toast.success('Employee Unblocked');
          setOpen(null);
        },
      });
    }
  };

  const handleBlockUser = (idb) => {
    const data = {
      idb,
      blocked: true,
    };

    if (CurrentUser === idb) {
      toast.error('self block/unblock not permitted');
    } else {
      blockEmployeeMutation.mutate(data, {
        onSuccess: () => {
          setIsBlocked(true);
          toast.success('Employee Blocked');
          setOpen(null);
        },
      });
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack alignItems="left" marginLeft={2} direction="column">
            <div className="flex gap-3 items-center">
              <div>
                <Avatar alt={name} src={employeeImage} />
              </div>
              <div>
                <Typography className="flex  items-center gap-2" variant="overline" noWrap>
                  {name}
                  {role === 'superAdmin' ? (
                    <div className="w-5 pt-[-5px]">
                      <svg
                        viewBox="0 0 1024.00 1024.00"
                        className="icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        transform="matrix(1, 0, 0, 1, 0, 0)"
                        stroke="#000000"
                        strokeWidth="0.01024"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M57 438.312l109.536 488.72h697.336l109.536-488.72-259.176 156.816-187.856-333.088-205.352 333.088z"
                            fill="#EC9312"
                          />
                          <path
                            d="M629.048 211.888c0 58.912-47.752 106.656-106.672 106.656-58.92 0-106.664-47.744-106.664-106.656 0-58.976 47.744-106.656 106.664-106.656s106.672 47.688 106.672 106.656z"
                            fill="#CB1B5B"
                          />
                          <path
                            d="M522.376 105.232c-58.92 0-106.664 47.68-106.664 106.656 0 58.912 47.744 106.656 106.664 106.656V105.232z"
                            fill="#E5226B"
                          />
                          <path d="M57 438.312l109.536 488.72h697.336z" fill="#F4A832" />
                          <path d="M973.408 438.312l-109.536 488.72H166.536z" fill="#F4A832" />
                          <path d="M166.536 927.032h697.336L515.2 715.832z" fill="#F5B617" />
                          <path
                            d="M1017.856 409.44a55.2 55.2 0 0 1-55.264 55.208 55.184 55.184 0 0 1-55.216-55.208 55.2 55.2 0 0 1 55.216-55.264 55.2 55.2 0 0 1 55.264 55.264z"
                            fill="#0472AF"
                          />
                          <path
                            d="M962.592 354.176a55.2 55.2 0 0 0-55.216 55.264 55.184 55.184 0 0 0 55.216 55.208V354.176z"
                            fill="#1A8DCC"
                          />
                          <path
                            d="M116.656 409.44a55.216 55.216 0 0 1-55.272 55.208A55.208 55.208 0 0 1 6.144 409.44a55.208 55.208 0 0 1 55.24-55.264 55.224 55.224 0 0 1 55.272 55.264z"
                            fill="#0472AF"
                          />
                          <path
                            d="M61.384 354.176A55.216 55.216 0 0 0 6.144 409.44a55.2 55.2 0 0 0 55.24 55.208V354.176z"
                            fill="#0092D2"
                          />
                        </g>
                      </svg>
                    </div>
                  ) : null}
                </Typography>

                <div>{email}</div>
              </div>
            </div>
            <Typography color="" variant="" noWrap />
          </Stack>
        </TableCell>

        <TableCell>{userName}</TableCell>
        <TableCell>
          <div className="w-full flex justify-center items-center">{bookings?.length || 0}</div>
        </TableCell>
        <TableCell>
          {access.map((m, index) => (
            <span key={index} className="border-r border-gray-600 pl-1 pr-2 capitalize">
              {' '}
              {m.value}
            </span>
          ))}
        </TableCell>

        <TableCell>
          <Label color={(isBlocked && 'blocked' && 'error') || 'success'}>
            {isBlocked ? 'Blocked' : 'Active'}
          </Label>
        </TableCell>

        <TableCell align="right">
          {role === 'superAdmin' && currentRole === 'admin' ? (
            ''
          ) : (
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleViewMore}>
          <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
          view
        </MenuItem>
        {isBlocked ? (
          <MenuItem
            onClick={() =>
              CustomModal(() => handleUnBlockUser(id), unblockMessages, setOpen(null), id)
            }
          >
            <Iconify icon="mdi:user-tick" sx={{ mr: 2 }} />
            Un-Block
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => CustomModal(() => handleBlockUser(id), blockMessages, setOpen(null), id)}
          >
            <Iconify icon="mdi:user-block" sx={{ mr: 2 }} />
            Block
          </MenuItem>
        )}

        <MenuItem onClick={() => handleEditMenu(id)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() =>
            CustomModal(() => handleDeleteEmployee(id), deleteEmployeeMessage, setOpen(null), id)
          }
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <UserDetailsModal
        open={showModal}
        onClose={() => (setShowModal(false), setOpen(null))}
        userDetails={{ id, name, email, role, bookings, employeeImage, access }}
      />
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  employeeImage: PropTypes.string,
  access: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  bookings: PropTypes.array.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
