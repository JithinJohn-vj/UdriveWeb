import swal from 'sweetalert';

export default function MultipleDeleteModal(executeFunction, messages, ids) {
  if (!Array.isArray(ids) || ids.length === 0) {
    console.error('Invalid array of IDs provided');
    return;
  }

  const deleteFunction = () => {
    executeFunction(ids);
  };

  try {
    swal({
      title: 'Are you sure?',
      text: messages ? messages[0] : '',
      className: 'swal-main',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      content: {
        element: 'div',
        attributes: {
          innerHTML: `
            <style>
              .swal-title, .swal-text { color: white; text-align: center; }
              .swal-modal { background-color: black; border: 1px solid gray; }
              .swal-button--confirm { background-color: #75dbcf; }
              .swal-button--confirm:hover { background-color: darkgreen; }
            </style>`,
        },
      },
    }).then((willDelete) => {
      if (willDelete) {
        deleteFunction();
        swal(messages ? messages[1] : '', {
          icon: 'success',
          className: 'swal-main',
          content: {
            element: 'div',
            attributes: {
              innerHTML: `
                <style>
                  .swal-title, .swal-text { color: black; text-align: center; }
                  .swal-modal { background-color: white; border: 1px solid gray; }
                  .swal-button--confirm { background-color: #75dbcf; }
                  .swal-button--confirm:hover { background-color: darkgreen; }
                </style>`,
            },
          },
        });
      } else {
        swal(messages ? messages[2] : '', {
          content: {
            element: 'div',
            attributes: {
              innerHTML: `
                <style>
                  .swal-title, .swal-text { color: black; text-align: center; }
                  .swal-modal { background-color: white; border: 1px solid gray; }
                  .swal-button--confirm { background-color: #75dbcf; }
                  .swal-button--confirm:hover { background-color: darkgreen; }
                </style>`,
            },
          },
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
}
