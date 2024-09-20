

import React, { useEffect, useState } from 'react';
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
  Grid,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import  { notifyDelete } from '../TostNotification';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface SuccessStory {
  id: number;
  couple_name: string;
  photo: string;
  date_of_marriage: string;
  status: number;
}

const SuccessStories: React.FC = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<SuccessStory[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const apiEndpoint = 'http://192.168.1.5:8000/api/success_stories_list/';

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, order, orderBy]);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      let fetchedData = response.data;

      // Sort the data client-side
      if (orderBy && order) {
        fetchedData = fetchedData.sort((a: SuccessStory, b: SuccessStory) => {
          if (a[orderBy as keyof SuccessStory] < b[orderBy as keyof SuccessStory]) {
            return order === 'asc' ? -1 : 1;
          }
          if (a[orderBy as keyof SuccessStory] > b[orderBy as keyof SuccessStory]) {
            return order === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }

      setData(fetchedData);
      setTotalCount(fetchedData.length);
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
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAdd = () => {
    navigate('/AddSuccessStories');
  };

  const handleEdit = (id: number) => {
    navigate(`/EditSuccessStory/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this success story?')) {
      try {
       const response = await axios.delete(`http://192.168.1.5:8000/api/success_stories/delete/${id}/`);
        setData((prevData) => prevData.filter((story) => story.id !== id));
        if (response.status >= 200 || response.status <= 299) {
          notifyDelete('Successfully Deleted');  
          
        }
      } catch (error) {
        console.error('Error deleting success story:', error);
      }
    }
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'photo', label: 'Photo' },
    { id: 'couple_name', label: 'Couple Name' },
    { id: 'date_of_marriage', label: 'Date of Marriage' },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Success Stories</h1>
      <Paper className="w-full">
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add
          </Button>
          <TextField
            label="Search by Couple Name"
            variant="outlined"
            margin="normal"
            value={search}
            onChange={handleSearchChange}
            style={{ width: '250px' }}
          />
        </div>
        <TableContainer className="bg-white">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: 100 }}
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
              {data.filter((row) =>
                row.couple_name.toLowerCase().includes(search.toLowerCase())
              ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="left">
                      {column.id === 'photo' ? (
                        <img
                          src={row.photo}
                          alt="Couple"
                          style={{ width: 100, height: 100, borderRadius: '50%' }}
                        />
                      ) : (
                        row[column.id as keyof SuccessStory]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                  <Button
                      onClick={() => handleEdit(row.id)}
                      variant="outlined"
                      color="primary"
                      style={{ marginRight: 8 }}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(row.id)}
                      variant="outlined"
                      color="error"
                      style={{ marginRight: 8 }}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    {/* <Button onClick={() => handleEdit(row.id)} style={{ marginRight: '10px' }}>{<EditIcon/>}Edit</Button>
                    <Button onClick={() => handleDelete(row.id)} color="error">{<DeleteIcon />}Delete</Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
    </>
  );
};

export default SuccessStories;
