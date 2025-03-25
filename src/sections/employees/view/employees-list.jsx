import { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';
import { useGetEmployees } from 'src/api/employees/Queries';
import { useDeleteMultipleEmployees } from 'src/api/employees/Mutations';

import Scrollbar from 'src/components/scrollbar';
import NotFound from 'src/components/custom-made/NotFound';
import ItemLoading from 'src/components/custom-made/ItemLoading';
import MultipleDeleteModal from 'src/components/custom-made/MutipleDeleteModal';
import { deleteMultipleEmployeesMessage } from 'src/components/messages/CustomModalMessages';

import { emptyRows, applyFilter, getComparator } from 'src/sections/commons/utils';
import { TableHead, TableNoData, TableToolbar, TableEmptyRows } from 'src/sections/commons';

import UserTableRow from '../user-table-row';
// ----------------------------------------------------------------------

export default function EmployeeList() {
  const getEmployeeQuery = useGetEmployees();
  const deleteMultipleEmployeeMutation = useDeleteMultipleEmployees();

  console.log(getEmployeeQuery);
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
      if (selected.length === getEmployeeQuery?.data?.length) {
        setSelected([]);
      } else {
        if (getEmployeeQuery.isSuccess) {
          newSelecteds = getEmployeeQuery.data.map((n) => n._id);
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
    inputData: getEmployeeQuery.isSuccess ? getEmployeeQuery.data : [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDelete = (selectedItems) => {
    console.log('Deleting items:', selectedItems);
    MultipleDeleteModal(
      () => deleteMultipleEmployeeMutation.mutate(selectedItems),
      deleteMultipleEmployeesMessage,
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
                  { id: 'name', label: 'Name' },
                  { id: 'username', label: 'User Name' },
                  { id: 'bookings', label: 'Bookings Made' },
                  { id: 'acess', label: 'Acess Given' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              {getEmployeeQuery.isLoading ? (
                <ItemLoading />
              ) : (
                <TableBody>
                  {dataFiltered.length === 0 && !filterName ? (
                    <NotFound
                      er1="No Employees Found"
                      er2="Create new employees to populate over here"
                    />
                  ) : (
                    dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <UserTableRow
                          key={row._id}
                          id={row._id}
                          access={row.access}
                          email={row.email}
                          name={row.name}
                          role={row.role}
                          bookings={row.bookings}
                          employeeImage={row.employeeImage?.url}
                          userName={row.userName}
                          isBlocked={row.isBlocked}
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
          count={getEmployeeQuery?.data?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
