
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification, { notifyDelete } from '../../TostNotification';

interface User {
  id: number;
  username: string;
  email: string;
  firstName:string;
  lastName:string;
  password: string;
  fullName: string;
  role: string;
  phoneNumber: string;
  status: string;
}

const AdminTable: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.9:8000/api/admin-users/');
        const data = response.data.map((item: any) => ({
          id: item.id, 
          username: item.username,
          email: item.email,
          firstName:item.first_name,
          lastName:item.last_name,
          password: item.password,
          fullName: item.full_name,
          role: item.role_id,
          phoneNumber: item.phone_number,
          status: item.status,
        }));
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/EditAdminUserForm/${id}`)
    console.log(`Edit user with id: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this user?',
    );
    if (isConfirmed) {
    try {
     let response = await axios.delete(`http://192.168.1.9:8000/api/admin-user/delete/${id}/`);
      if (response.status >= 200 || response.status <= 201) {
        notifyDelete('Successfully Deleted');  
      }
      setUsers(users.filter((user) => user.id !== id));
      console.log(`Deleted user with id: ${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  };

  const handleAdd = () => {
    navigate('/AdminUsers');
    console.log('Add new page');
  };

  return (
    <Paper>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          style={{ marginBottom: '10px' }}
        >
          Add
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '60px' }}>
                User Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '60px' }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '60px' }}>
                Full Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '60px' }}>
                Roll Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textAlign: 'right',
                  paddingRight: '50px',
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
               
                <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{user.username}</TableCell>
                <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{user.email}</TableCell>
                <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{`${user.firstName} ${user.lastName}`}</TableCell>
               <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{user.role}</TableCell>
               <TableCell align="right">
                  <Button
                    onClick={() => handleEdit(user.id)}
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: 22 }}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    style={{ marginTop: 16 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Notification />
    </Paper>
    
  );
};

export default AdminTable;
