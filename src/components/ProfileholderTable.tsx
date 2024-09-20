// import React, { useEffect, useState } from 'react';
// import { 
//     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton 
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'; // Import icons
// import { getProfileHolders, addProfileHolder, updateProfileHolder, deleteProfileHolder } from '../services/api';

// const ProfileHolderTable: React.FC = () => {
//     const [profileHolders, setProfileHolders] = useState<any[]>([]);
//     const [open, setOpen] = useState(false);
//     const [currentProfileHolder, setCurrentProfileHolder] = useState<any>(null);

//     useEffect(() => {
//         fetchProfileHolders();
//     }, []);

//     const fetchProfileHolders = async () => {
//         const response = await getProfileHolders();
//         setProfileHolders(response.data);
//     };

//     const handleOpen = (profileHolder: any = null) => {
//         setCurrentProfileHolder(profileHolder);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentProfileHolder(null);
//     };

//     const handleSave = async () => {
//         if (currentProfileHolder.id) {
//             await updateProfileHolder(currentProfileHolder.id, currentProfileHolder);
//         } else {
//             await addProfileHolder(currentProfileHolder);
//         }
//         fetchProfileHolders();
//         handleClose();
//     };

//     const handleDelete = async (id: string) => {
//         await deleteProfileHolder(id);
//         fetchProfileHolders();
//     };

//     return (
//         <Paper>
//             <Button onClick={() => handleOpen()}>Add Profile Holder</Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Relation</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {profileHolders.map((profileHolder) => (
//                             <TableRow key={profileHolder.id}>
//                                 <TableCell>{profileHolder.id}</TableCell>
//                                 <TableCell>{profileHolder.name}</TableCell>
//                                 <TableCell>{profileHolder.relation}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleOpen(profileHolder)} aria-label="edit">
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(profileHolder.id)} aria-label="delete">
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentProfileHolder?.id ? 'Edit Profile Holder' : 'Add Profile Holder'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Name"
//                         value={currentProfileHolder?.name || ''}
//                         onChange={(e) => setCurrentProfileHolder({ ...currentProfileHolder, name: e.target.value })}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Relation"
//                         value={currentProfileHolder?.relation || ''}
//                         onChange={(e) => setCurrentProfileHolder({ ...currentProfileHolder, relation: e.target.value })}
//                         fullWidth
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleSave}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </Paper>
//     );
// };

// export default ProfileHolderTable;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Reuse from './Basic/Reuse';
import Notification, { notify, notifyDelete } from './TostNotification';

interface ProfileHolder {
  id: number;
  name: string;
  relation: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const ProfileHolderTable: React.FC = () => {
  const [profileHolders, setProfileHolders] = useState<ProfileHolder[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newProfileHolder, setNewProfileHolder] = useState<Partial<ProfileHolder>>({});
  const [editProfileHolderId, setEditProfileHolderId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [profileHolderToDelete, setProfileHolderToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchProfileHolders();
  }, []);

  const fetchProfileHolders = async () => {
    try {
      const response = await axios.get('http://103.214.132.20:8000/api/profile-holders/');
      setProfileHolders(response.data);
    } catch (error) {
      console.error('Error fetching profile holders:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      let response = await axios.delete(`http://103.214.132.20:8000/api/profile-holders/${id}/`);
      if (response.status >= 200 || response.status <= 201) {
        notifyDelete('Successfully Deleted');
        fetchProfileHolders();
      }
    } catch (error) {
      console.error('Error deleting profile holder:', error);
    }
  };

  const handleAddOrUpdateProfileHolder = async () => {
    if (editProfileHolderId) {
      let response = await axios.put(`http://103.214.132.20:8000/api/profile-holders/${editProfileHolderId}/`, newProfileHolder);
      if (response.status >= 200 || response.status <= 201) {
        notify('Successfully updated');
      }
    } else {
      let response = await axios.post('http://103.214.132.20:8000/api/profile-holders/', newProfileHolder);
      if (response.status >= 200 || response.status <= 201) {
        notify('Successfully added');
      }
    }
    setNewProfileHolder({});
    setEditProfileHolderId(null);
    setShowPopup(false);
    fetchProfileHolders();
  };

  const handleEdit = (profileHolder: ProfileHolder) => {
    setEditProfileHolderId(profileHolder.id);
    setNewProfileHolder(profileHolder);
    setShowPopup(true);
  };

  const handleDeleteConfirm = (id: number) => {
    setProfileHolderToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (profileHolderToDelete !== null) {
      await handleDelete(profileHolderToDelete);
      setProfileHolderToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleSearchChange = (query: string) => {
    // Handle search functionality here
  };

  const columns: ColumnConfig<ProfileHolder>[] = [
    { field: 'name', headerName: 'Name', sortable: true },
    { field: 'relation', headerName: 'Relation', sortable: true },
  ];

  return (
    <Container style={{ backgroundColor: 'white', padding: '20px' }}>
      <Reuse
        data={profileHolders}
        columns={columns}
        handleSearchChange={handleSearchChange}
        handleEdit={handleEdit}
        handleDelete={(id) => handleDeleteConfirm(Number(id))}
        setShowPopup={setShowPopup}
        idField="id"
        title="Profile Holders"
      />

      {showPopup && (
        <Dialog open={showPopup} onClose={() => setShowPopup(false)} maxWidth="sm">
          <Box>
            <DialogTitle style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginTop: '20px', fontSize: '50px' }}>
              {editProfileHolderId ? 'Edit Profile Holder' : 'Add Profile Holder'}
            </DialogTitle>
          </Box>
          <DialogContent style={{ padding: '50px 50px' }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Name"
                  value={newProfileHolder.name || ''}
                  onChange={(e) => setNewProfileHolder({ ...newProfileHolder, name: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Relation"
                  value={newProfileHolder.relation || ''}
                  onChange={(e) => setNewProfileHolder({ ...newProfileHolder, relation: e.target.value })}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ marginRight: '43px' }}>
            <Button style={{ background: '#FFFDFF', color: 'red', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' }} onClick={() => setShowPopup(false)}>
              Cancel
            </Button>
            <Button style={{ background: 'red', color: 'white', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)' }} onClick={handleAddOrUpdateProfileHolder} disabled={!newProfileHolder.name?.trim()}>
              {editProfileHolderId ? 'Update' : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {deleteConfirmation && (
        <Dialog open={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this Profile Holder?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Notification />
    </Container>
  );
};

export default ProfileHolderTable;
