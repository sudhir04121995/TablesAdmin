import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import { getDataTable } from '../services/api';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

interface DataTableProps {
  columns: Column[];
  apiEndpoint: string;
}

interface Data {
  results: any[];
  count: number;
}

const columns: Column[] = [
  { id: 'ProfileId', label: 'Profile ID', minWidth: 100 },
  { id: 'Gender', label: 'Gender', minWidth: 100 },
  { id: 'Mobile_no', label: 'Mobile No', minWidth: 150 },
  { id: 'EmailId', label: 'Email', minWidth: 150 },
  { id: 'Profile_marital_status', label: 'Marital Status', minWidth: 100 },
  { id: 'Profile_dob', label: 'Date of Birth', minWidth: 100 },
  { id: 'Profile_complexion', label: 'Complexion', minWidth: 100 },
  { id: 'Profile_address', label: 'Address', minWidth: 200 },
  { id: 'Profile_country', label: 'Country', minWidth: 100 },
  { id: 'Profile_state', label: 'State', minWidth: 100 },
  { id: 'Profile_city', label: 'City', minWidth: 100 },
  { id: 'Profile_pincode', label: 'Pincode', minWidth: 100 },
];

const DataTable: React.FC<DataTableProps> = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('ProfileId');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<Data>({ results: [], count: 0 });
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, order, orderBy, search]);

  const fetchData = async () => {
    try {
      const response = await getDataTable(
        search,
        orderBy,
        order,
        page + 1,
        rowsPerPage,
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0); // Reset page to 0 when search term changes
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (ContentId: number) => {
    if (!ContentId) {
      console.error('Error: Missing ID for the row to delete');
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this item?',
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/logindetails/${ContentId}/`,
      );
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <Paper className="w-full">
      <div className="w-full text-right px-2">
        <TextField
          label="Search"
          variant="outlined"
          margin="normal"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <TableContainer className="bg-white">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    className="!text-red-600 !text-base !text-md text-nowrap font-semibold"
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell className="!text-red-600 !text-base !text-nowrap !font-semibold">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.results.map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'ProfileId' ? (
                        <Link
                          to={`/Matching-Profiles?profile_id=${value}`}
                          style={{
                            color: 'blue',
                            textDecoration: 'underline',
                          }}
                        >
                          {value}
                        </Link>
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
                <TableCell>
                  <Button component={Link} to={`/admin/edit/${row.ContentId}`}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(row.ContentId)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
