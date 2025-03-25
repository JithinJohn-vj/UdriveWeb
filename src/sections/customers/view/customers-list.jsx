// import { useState } from 'react';

// import Card from '@mui/material/Card';
// import Table from '@mui/material/Table';
// import Container from '@mui/material/Container';
// import TableBody from '@mui/material/TableBody';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

// import { cars, customers } from 'src/_mock/user';

// import Scrollbar from 'src/components/scrollbar';

// import TableNoData from '../table-no-data';
// import CustomerTableRow from '../user-table-row';
// import UserTableHead from '../user-table-head';
// import TableEmptyRows from '../table-empty-rows';
// import UserTableToolbar from '../user-table-toolbar';
// import { emptyRows, applyFilter, getComparator } from '../utils';

// // ----------------------------------------------------------------------

// export default function CarsList() {
//   const [page, setPage] = useState(0);

//   const [order, setOrder] = useState('asc');

//   const [selected, setSelected] = useState([]);

//   const [orderBy, setOrderBy] = useState('name');

//   const [filterName, setFilterName] = useState('');

//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleSort = (event, id) => {
//     const isAsc = orderBy === id && order === 'asc';
//     if (id !== '') {
//       setOrder(isAsc ? 'desc' : 'asc');
//       setOrderBy(id);
//     }
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = cars.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setFilterName(event.target.value);
//   };

//   const dataFiltered = applyFilter({
//     inputData: customers,
//     comparator: getComparator(order, orderBy),
//     filterName,
//   });

//   const notFound = !dataFiltered.length && !!filterName;

//   return (
//     <Container>
//       <Card>
//         <UserTableToolbar
//           numSelected={selected.length}
//           filterName={filterName}
//           onFilterName={handleFilterByName}
//         />

//         <Scrollbar>
//           <TableContainer sx={{ overflow: 'unset' }}>
//             <Table sx={{ minWidth: 800 }}>
//               <UserTableHead
//                 order={order}
//                 orderBy={orderBy}
//                 rowCount={cars.length}
//                 numSelected={selected.length}
//                 onRequestSort={handleSort}
//                 onSelectAllClick={handleSelectAllClick}
//                 headLabel={[
//                   { id: 'name', label: 'Name',minWidth: 150 },
//                   { id: 'passport', label: 'Passport Number',minWidth: 150 },
//                   { id: 'location', label: 'Location' ,minWidth: 150},
//                   { id: 'bookings', label: 'Bookings Made',minWidth: 150 },
//                   { id: 'status', label: 'Status',minWidth: 150 },
//                   { id: '' },
//                 ]}
//               />
//               <TableBody>
//                 {dataFiltered
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row) => (
//                     <CustomerTableRow
//                       key={row.id}
//                       name={row.name}
//                       date={row.date}
//                       transmission={row.transmission}
//                       service_interval={row.service_interval}
//                       fuel={row.fuel}
//                       role={row.role}
//                       status={row.status}
//                       company={row.company}
//                       avatarUrl={row.avatarUrl}
//                       year={row.year}
//                       isVerified={row.isVerified}
//                       selected={selected.indexOf(row.name) !== -1}
//                       handleClick={(event) => handleClick(event, row.name)}
//                     />
//                   ))}

//                 <TableEmptyRows
//                   height={77}
//                   emptyRows={emptyRows(page, rowsPerPage, cars.length)}
//                 />

//                 {notFound && <TableNoData query={filterName} />}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Scrollbar>

//         <TablePagination
//           page={page}
//           component="div"
//           count={cars.length}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handleChangePage}
//           rowsPerPageOptions={[5, 10, 25]}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Card>
//     </Container>
//   );
// }

import { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';
import { useGetCustomers } from 'src/api/customers/Queries';
import { useDeleteMultipleCustomers } from 'src/api/customers/Mutations';

import Scrollbar from 'src/components/scrollbar';
import NotFound from 'src/components/custom-made/NotFound';
import ItemLoading from 'src/components/custom-made/ItemLoading';
import MultipleDeleteModal from 'src/components/custom-made/MutipleDeleteModal';
import { deleteMultipleCustomersMessage } from 'src/components/messages/CustomModalMessages';

import { TableHead, TableNoData, TableToolbar, TableEmptyRows } from 'src/sections/commons';

import CustomerTableRow from '../customer-table-row';
import { emptyRows, applyFilter, getComparator } from '../../commons/utils';

// ----------------------------------------------------------------------

export default function CustomersList() {
  const getCustomersQuery = useGetCustomers();
  const deleteMultipleCustomersMutation = useDeleteMultipleCustomers();
  console.log(getCustomersQuery);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      let newSelecteds;
      if (selected.length === getCustomersQuery?.data?.length) {
        setSelected([]);
      } else {
        if (getCustomersQuery.isSuccess) {
          newSelecteds = getCustomersQuery.data.map((n) => n._id);
        } else {
          newSelecteds = [];
        }
        setSelected(newSelecteds);
      }
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id);
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: getCustomersQuery.isSuccess ? getCustomersQuery.data : [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDelete = (selectedItems) => {
    console.log('Deleting items:', selectedItems);
    MultipleDeleteModal(
      () => deleteMultipleCustomersMutation.mutate(selectedItems),
      deleteMultipleCustomersMessage,
      selectedItems
    );
    setSelected([]);
  };

  return (
    <Container>
      <Card>
        <TableToolbar
          selected={selected}
          filterName={filterName}
          onDelete={handleDelete}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name', minWidth: 150 },
                  // { id: 'passport', label: 'Passport Number', minWidth: 150 },
                  { id: 'location', label: 'Location', minWidth: 150 },
                  { id: 'bookings', label: 'Bookings Made', minWidth: 150 },
                  { id: 'status', label: 'Status', minWidth: 150 },
                  { id: '' },
                ]}
              />
              {getCustomersQuery.isLoading ? (
                <ItemLoading />
              ) : (
                <TableBody>
                  {dataFiltered.length === 0 && !filterName ? (
                    <NotFound
                      er1="No Customers Found"
                      er2="Create new customers to populate over here"
                    />
                  ) : (
                    dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <CustomerTableRow
                          key={row._id}
                          customerImage={row.customerImage?.url}
                          name={row.name}
                          id={row._id}
                          contactNumber={row.contactNumber}
                          abroadNumber={row.abroadNumber}
                          nativeNumber={row.nativeNumber}
                          email={row.email}
                          passportNumber={row.passportNumber}
                          pincode={row.pincode}
                          state={row.state}
                          address={row.address}
                          locality={row.locality}
                          cityOrDistrict={row.cityOrDistrict}
                          bookings={row.bookings}
                          passportImage={row.passportImage?.url}
                          selected={selected.includes(row._id)}
                          handleClick={(event) => handleClick(event, row._id)}
                        />
                      ))
                  )}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={getCustomersQuery?.data?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
