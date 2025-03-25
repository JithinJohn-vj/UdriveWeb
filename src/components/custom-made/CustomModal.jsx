import swal from 'sweetalert';

import UserCredentials from 'src/zustand/UserCredentials';

export default function CustomModal(executeFunction, message, m, id) {
  console.log(id);
  const { user } = UserCredentials.getState();
  const CurrentUser = user?.user?._id;

  if (CurrentUser === id) {
    executeFunction();
  } else {
    try {
      swal({
        title: 'Are you sure?',
        text: message ? message[0] : '',
        className: 'swal-main',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
        content: {
          element: 'div',
          attributes: {
            innerHTML:
              '<style>.swal-title, .swal-text { color: white; text-align: center; } .swal-modal { background-color: black; border: 1px solid gray; } .swal-button--confirm { background-color: #75dbcf; } .swal-button--confirm:hover { background-color: darkgreen; }</style>',
          },
        },
      }).then((willDelete) => {
        if (willDelete) {
          executeFunction();
          swal(message ? message[1] : '', {
            icon: 'success',
            className: 'swal-main',
            content: {
              element: 'div',
              attributes: {
                innerHTML:
                  '<style>.swal-title, .swal-text { color: black; text-align: center; } .swal-modal { background-color: white; border: 1px solid gray; } .swal-button--confirm { background-color: #75dbcf; } .swal-button--confirm:hover { background-color: darkgreen; }</style>',
              },
            },
          });
        } else {
          swal(message ? message[2] : '', {
            content: {
              element: 'div',
              attributes: {
                innerHTML:
                  '<style>.swal-title, .swal-text { color: black; text-align: center; } .swal-modal { background-color: white; border: 1px solid gray; } .swal-button--confirm { background-color: #75dbcf; } .swal-button--confirm:hover { background-color: darkgreen; }</style>',
              },
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
