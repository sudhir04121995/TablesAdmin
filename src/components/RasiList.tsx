// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   IconButton,
//   MenuItem,
//   Select,
//   Container,
//   Typography,
//   Pagination,
// } from '@mui/material';
// import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
// import axios from 'axios';

// interface Rasi {
//   id: number;
//   name: string;
// }

// const RasiTable: React.FC = () => {
//   const [rasis, setRasis] = useState<Rasi[]>([]);
//   const [newRasi, setNewRasi] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [editRasiId, setEditRasiId] = useState<number | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [rasiToDelete, setRasiToDelete] = useState<number | null>(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [pageSize, setPageSize] = useState<number>(20);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   useEffect(() => {
//     fetchRasis();
//   }, []);

//   const fetchRasis = async () => {
//     const response = await axios.get('http://103.214.132.20:8000/api/rasis/');
//     setRasis(response.data);
//   };

//   const addOrUpdateRasi = async () => {
//     const rasiData = { name: newRasi };
//     if (editRasiId) {
//       await axios.put(`http://192.168.172.122:8000/api/accounts/rasis/${editRasiId}/`, rasiData);
//     } else {
//       await axios.post('http://192.168.172.122:8000/api/accounts/rasis/', rasiData);
//     }
//     setNewRasi('');
//     setShowPopup(false);
//     setEditRasiId(null);
//     fetchRasis();
//     setShowSuccessPopup(true);
//   };

//   const handleEditRasi = (rasi: Rasi) => {
//     setEditRasiId(rasi.id);
//     setNewRasi(rasi.name);
//     setShowPopup(true);
//   };

//   const handleDeleteRasi = (id: number) => {
//     setRasiToDelete(id);
//     setDeleteConfirmation(true);
//   };

//   const confirmDeleteRasi = async () => {
//     if (rasiToDelete !== null) {
//       await axios.delete(`http://192.168.172.122:8000/api/accounts/rasis/${rasiToDelete}/`);
//       setRasiToDelete(null);
//       setDeleteConfirmation(false);
//       fetchRasis();
//     }
//   };

//   const cancelDeleteRasi = () => {
//     setRasiToDelete(null);
//     setDeleteConfirmation(false);
//   };

//   const handlePopupOpen = () => {
//     setShowPopup(true);
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//     setNewRasi('');
//     setEditRasiId(null);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
//     setCurrentPage(value);
//   };

//   const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setPageSize(event.target.value as number);
//     setCurrentPage(1);
//   };

//   const filteredRasis = rasis
//     .filter((rasi) =>
//       rasi.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   return (
//     <Container style={{ backgroundColor: 'white', padding: '20px' }}>
//       <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
//         <Typography variant="h4" gutterBottom>
//           Rasis
//         </Typography>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//           <div>
//             <Select value={pageSize} onChange={handlePageSizeChange}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={20}>20</MenuItem>
//               <MenuItem value={30}>30</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </div>
//           <div>
//             <TextField
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               placeholder="Search Rasi"
//               style={{ marginRight: '10px' }}
//             />
//             <Button onClick={handlePopupOpen}>
//               <AddIcon />
//             </Button>
//           </div>
//         </div>
//         <List>
//           {filteredRasis.map((rasi) => (
//             <ListItem key={rasi.id}>
//               <ListItemText primary={rasi.name} />
//               <ListItemSecondaryAction>
//                 <IconButton edge="end" aria-label="edit" onClick={() => handleEditRasi(rasi)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRasi(rasi.id)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItemSecondaryAction>
//             </ListItem>
//           ))}
//         </List>
//         <Pagination
//           count={Math.ceil(rasis.filter((rasi) =>
//             rasi.name.toLowerCase().includes(searchQuery.toLowerCase())
//           ).length / pageSize)}
//           page={currentPage}
//           onChange={handlePageChange}
//           style={{ marginTop: '20px', display: 'flex', justifyContent: 'end' }}
//         />
//       </div>
//       {showPopup && (
//         <Dialog open={showPopup} onClose={handlePopupClose}>
//           <DialogTitle>{editRasiId ? 'Edit Rasi' : 'Add Rasi'}</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Rasi Name"
//               value={newRasi}
//               onChange={(e) => setNewRasi(e.target.value)}
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handlePopupClose}>Cancel</Button>
//             <Button onClick={addOrUpdateRasi} disabled={!newRasi.trim()}>
//               {editRasiId ? 'Update' : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//       {deleteConfirmation && (
//         <Dialog open={deleteConfirmation} onClose={cancelDeleteRasi}>
//           <DialogTitle>Confirmation</DialogTitle>
//           <DialogContent>
//             <p>Are you sure you want to delete this Rasi?</p>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={confirmDeleteRasi}>Yes</Button>
//             <Button onClick={cancelDeleteRasi}>No</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//       {showSuccessPopup && (
//         <Dialog open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)}>
//           <DialogTitle>Success</DialogTitle>
//           <DialogContent>
//             <p>Rasi has been successfully {editRasiId ? 'updated' : 'added'}!</p>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setShowSuccessPopup(false)}>Close</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Container>
//   );
// };

// export default RasiTable;



// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Container,
//   Typography
// } from '@mui/material';
// import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
// import axios from 'axios';
// import Reuse from './Basic/Reuse';



// interface Rasi {
//   id: number;
//   name: string;
// }
// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const RasiTable: React.FC = () => {
//   const [rasis, setRasis] = useState<Rasi[]>([]);
//   const [newRasi, setNewRasi] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [editRasiId, setEditRasiId] = useState<number | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [rasiToDelete, setRasiToDelete] = useState<number | null>(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [pageSize, setPageSize] = useState<number>(20);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   useEffect(() => {
//     fetchRasis();
//   }, []);

//   const fetchRasis = async () => {
//     const response = await axios.get('http://103.214.132.20:8000/api/rasis/');
//     setRasis(response.data);
//   };

//   const addOrUpdateRasi = async () => {
//     const rasiData = { name: newRasi };
//     if (editRasiId) {
//       await axios.put(`http://192.168.172.122:8000/api/accounts/rasis/${editRasiId}/`, rasiData);
//     } else {
//       await axios.post('http://192.168.172.122:8000/api/accounts/rasis/', rasiData);
//     }
//     setNewRasi('');
//     setShowPopup(false);
//     setEditRasiId(null);
//     fetchRasis();
//     setShowSuccessPopup(true);
//   };

//   const handleEditRasi = (rasi: Rasi) => {
//     setEditRasiId(rasi.id);
//     setNewRasi(rasi.name);
//     setShowPopup(true);
//   };

//   const handleDeleteRasi = (id: number) => {
//     setRasiToDelete(id);
//     setDeleteConfirmation(true);
//   };

//   const confirmDeleteRasi = async () => {
//     if (rasiToDelete !== null) {
//       await axios.delete(`http://192.168.172.122:8000/api/accounts/rasis/${rasiToDelete}/`);
//       setRasiToDelete(null);
//       setDeleteConfirmation(false);
//       fetchRasis();
//     }
//   };

//   const cancelDeleteRasi = () => {
//     setRasiToDelete(null);
//     setDeleteConfirmation(false);
//   };

//   const handleSearchChange = (query: string) => {
//     setSearchQuery(query);
//   };

//   const columns :ColumnConfig<Rasi>[] = [
//     { field: 'id', headerName: 'ID' , sortable: true },
//     { field: 'name', headerName: 'Rasi', sortable: true }
//   ];

//   return (
//     <Container style={{ backgroundColor: 'white', padding: '20px' }}>
     

//       <Reuse
//         data={rasis}
//         columns={columns}
//         handleSearchChange={handleSearchChange}
//         handleEdit={handleEditRasi}
//         handleDelete={(id) => handleDeleteRasi(Number(id))} 
//         setShowPopup={setShowPopup}
//         idField="id"
//         title="Rasis"
//       />

//       {showPopup && (
//         <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
//           <DialogTitle>{editRasiId ? 'Edit Rasi' : 'Add Rasi'}</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Rasi Name"
//               value={newRasi}
//               onChange={(e) => setNewRasi(e.target.value)}
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setShowPopup(false)}>Cancel</Button>
//             <Button onClick={addOrUpdateRasi} disabled={!newRasi.trim()}>
//               {editRasiId ? 'Update' : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       {deleteConfirmation && (
//         <Dialog open={deleteConfirmation} onClose={cancelDeleteRasi}>
//           <DialogTitle>Confirmation</DialogTitle>
//           <DialogContent>
//             <p>Are you sure you want to delete this Rasi?</p>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={confirmDeleteRasi}>Yes</Button>
//             <Button onClick={cancelDeleteRasi}>No</Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       {showSuccessPopup && (
//         <Dialog open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)}>
//           <DialogTitle>Success</DialogTitle>
//           <DialogContent>
//             <p>Rasi has been successfully {editRasiId ? 'updated' : 'added'}!</p>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setShowSuccessPopup(false)}>Close</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Container>
//   );
// };

// export default RasiTable;




import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Container,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import Reuse from './Basic/Reuse';
import Notification, { notify, notifyDelete } from './TostNotification';
import TablePopUp from './TablePopUp';



interface Rasi {
  id: number;
  name: string;
}
interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const RasiTable: React.FC = () => {
  const [rasis, setRasis] = useState<Rasi[]>([]);
  const [newRasi, setNewRasi] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [editRasiId, setEditRasiId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [rasiToDelete, setRasiToDelete] = useState<number | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchRasis();
  }, []);

  const fetchRasis = async () => {
    const response = await axios.get('http://103.214.132.20:8000/api/rasis/');
    setRasis(response.data);
  };

  const addOrUpdateRasi = async () => {
    const rasiData = { name: newRasi };
    let response;
    if (editRasiId) {
      response = await axios.put(`http://103.214.132.20:8000/api/rasis/${editRasiId}/`, rasiData);
      if (response.status >= 200 || response.status <= 201) {
        notify('Successfully updated');
      }
    } else {
      response =  await axios.post('http://103.214.132.20:8000/api/rasis/', rasiData);
      if (response.status >= 200 || response.status <= 201) {
        notify('Successfully updated');
      }
    }
    
    setNewRasi('');
    setShowPopup(false);
    setEditRasiId(null);
    fetchRasis();
    setShowSuccessPopup(true);
  };

  const handleEditRasi = (rasi: Rasi) => {
    setEditRasiId(rasi.id);
    setNewRasi(rasi.name);
    setShowPopup(true);
  };
  const clearValues = () => {
    setEditRasiId(null);
    setNewRasi('');
   
    setShowPopup(false);
  }
  const handleDeleteRasi = (id: number) => {
    setRasiToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteRasi = async () => {
    if (rasiToDelete !== null) {
     let response = await axios.delete(`http://103.214.132.20:8000/api/rasis/${rasiToDelete}/`);
      if (response.status >= 200 || response.status <= 201) {
        notifyDelete('Successfully Deleted');  
      }
      setRasiToDelete(null);
      setDeleteConfirmation(false);
      fetchRasis();
    }
  };

  

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const columns :ColumnConfig<Rasi>[] = [
    { field: 'id', headerName: 'ID' , sortable: true },
    { field: 'name', headerName: 'Rasi', sortable: true }
  ];

  return (
    <Container
    style={{
      backgroundColor: 'white',
      padding: '20px',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
      }}
    >
     

      <Reuse
        data={rasis}
        columns={columns}
        handleSearchChange={handleSearchChange}
        handleEdit={handleEditRasi}
        handleDelete={(id) => handleDeleteRasi(Number(id))} 
        setShowPopup={setShowPopup}
        idField="id"
        title="Rasi"
      />

<TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={addOrUpdateRasi}
          EditId={editRasiId}
          valueOne={newRasi}
          setValueOne={setNewRasi}

          labelOne={'Birth Star'}

          addMsg="Add Rasi"
          editMsg="Edit Rasi"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteRasi}
          deletLabel="Are you sure you want to delete this Rasi?" setValueTwo={function (_value: string): void {
            throw new Error('Function not implemented.');
          } } setValueThree={function (_value: string): void {
            throw new Error('Function not implemented.');
          } } setValueFour={function (_value: string): void {
            throw new Error('Function not implemented.');
          } } valueFour={null} labelTwo={''} LabelThree={''} LabelFour={''}        />
</div>
   

    
        <Notification />
    </Container>
  );
};

export default RasiTable;
function setSearchQuery(query: string) {
  throw new Error('Function not implemented.');
}

