// // components/ParentsOccupationTable.tsx

// import React, { useEffect, useState } from 'react';
// import {
//     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { getParentsOccupations, addParentsOccupation, updateParentsOccupation, deleteParentsOccupation } from '../services/api';

// // Define a TypeScript interface for Parents Occupation data
// interface ParentsOccupation {
//     id?: string;
//     occupation: string;
// }

// const ParentsOccupationTable: React.FC = () => {
//     const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
//     const [open, setOpen] = useState(false);
//     const [currentParentsOccupation, setCurrentParentsOccupation] = useState<ParentsOccupation | null>(null);

//     useEffect(() => {
//         fetchParentsOccupations();
//     }, []);

//     const fetchParentsOccupations = async () => {
//         try {
//             const response = await getParentsOccupations();
//             console.log("Fetched parents occupations data:", response.data); // Log fetched data
//             setParentsOccupations(response.data);
//         } catch (error) {
//             console.error("Error fetching parents occupations:", error);
//         }
//     };

//     const handleOpen = (parentsOccupation: ParentsOccupation | null = null) => {
//         setCurrentParentsOccupation(parentsOccupation);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentParentsOccupation(null);
//     };

//     const handleSave = async () => {
//         if (!currentParentsOccupation) return;

//         try {
//             if (currentParentsOccupation.id) {
//                 await updateParentsOccupation(currentParentsOccupation.id, currentParentsOccupation);
//             } else {
//                 await addParentsOccupation(currentParentsOccupation);
//             }
//             fetchParentsOccupations();
//             handleClose();
//         } catch (error) {
//             console.error("Error saving parents occupation:", error);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             await deleteParentsOccupation(id);
//             fetchParentsOccupations();
//         } catch (error) {
//             console.error("Error deleting parents occupation:", error);
//         }
//     };

//     return (
//         <Paper>
//             <Button onClick={() => handleOpen()}>Add Parents Occupation</Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Occupation</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parentsOccupations.map((parentsOccupation) => (
//                             <TableRow key={parentsOccupation.id}>
//                                 <TableCell>{parentsOccupation.id}</TableCell>
//                                 <TableCell>{parentsOccupation.occupation}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleOpen(parentsOccupation)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(parentsOccupation.id!)}>
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentParentsOccupation?.id ? 'Edit Parents Occupation' : 'Add Parents Occupation'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Occupation"
//                         value={currentParentsOccupation?.occupation || ''}
//                         onChange={(e) => setCurrentParentsOccupation({ ...currentParentsOccupation, occupation: e.target.value })}
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

// export default ParentsOccupationTable;


// // ParentsOccupationTable.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,
// } from '@mui/material';

// import {
//   getParentsOccupations, addParentsOccupation, updateParentsOccupation, deleteParentsOccupation,
// } from '../services/api';
// import Reuse from './Basic/Reuse';

// interface ParentsOccupation {
//   id: string;
//   occupation: string;
// }

// interface ColumnConfig<T> {
//     field: keyof T;
//     headerName: string;
//     sortable: boolean;
//   }

// const columns :ColumnConfig<ParentsOccupation>[] = [
//   { field: 'id', headerName: 'ID', sortable: true },
//   { field: 'occupation', headerName: 'Occupation', sortable: true },
// ];

// const ParentsOccupationTable: React.FC = () => {
//   const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentParentsOccupation, setCurrentParentsOccupation] = useState<ParentsOccupation | null>(null);

//   useEffect(() => {
//     fetchParentsOccupations();
//   }, []);

//   const fetchParentsOccupations = async () => {
//     try {
//       const response = await getParentsOccupations();
//       setParentsOccupations(response.data);
//     } catch (error) {
//       console.error('Error fetching parents occupations:', error);
//     }
//   };

//   const handleSearchChange = (query: string) => {
//     // Add search functionality here if required
//   };

//   const handleEdit = (item: ParentsOccupation) => {
//     setCurrentParentsOccupation(item);
//     setOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteParentsOccupation(id);
//       fetchParentsOccupations();
//     } catch (error) {
//       console.error('Error deleting parents occupation:', error);
//     }
//   };

//   const handleSave = async () => {
//     if (!currentParentsOccupation) return;

//     try {
//       if (currentParentsOccupation.id) {
//         await updateParentsOccupation(currentParentsOccupation.id, currentParentsOccupation);
//       } else {
//         await addParentsOccupation(currentParentsOccupation);
//       }
//       fetchParentsOccupations();
//       handleClose();
//     } catch (error) {
//       console.error('Error saving parents occupation:', error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentParentsOccupation(null);
//   };

//   return (
//     <>
//       <Reuse
//         data={parentsOccupations}
//         columns={columns}
//         handleSearchChange={handleSearchChange}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//         setShowPopup={setOpen}
//         idField="id"
//         title="Parents Occupations"
//       />

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{currentParentsOccupation?.id ? 'Edit' : 'Add'} Parents Occupation</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Occupation"
//             fullWidth
//             value={currentParentsOccupation?.occupation || ''}
//             onChange={(e) =>
//               setCurrentParentsOccupation({
//                 ...currentParentsOccupation,
//                 occupation: e.target.value,
//               })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ParentsOccupationTable;


// // ParentsOccupationTable.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid,
// } from '@mui/material';

// import {
//   getParentsOccupations, addParentsOccupation, updateParentsOccupation, deleteParentsOccupation,
// } from '../services/api';
// import Reuse from './Basic/Reuse';

// interface ParentsOccupation {
//   id: string;
//   occupation: string;
// }
// interface ColumnConfig<T> {
//     field: keyof T;
//     headerName: string;
//     sortable: boolean;
//   }
// const columns:ColumnConfig<ParentsOccupation>[] = [
//   { field: 'id', headerName: 'ID', sortable: true },
//   { field: 'occupation', headerName: 'Occupation', sortable: true },
// ];

// const ParentsOccupationTable: React.FC = () => {
//   const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentParentsOccupation, setCurrentParentsOccupation] = useState<ParentsOccupation | null>(null);

//   useEffect(() => {
//     fetchParentsOccupations();
//   }, []);

//   const fetchParentsOccupations = async () => {
//     try {
//       const response = await getParentsOccupations();
//       setParentsOccupations(response.data);
//     } catch (error) {
//       console.error('Error fetching parents occupations:', error);
//     }
//   };

//   const handleSearchChange = (query: string) => {
//     // Add search functionality here if required
//   };

//   const handleEdit = (item: ParentsOccupation) => {
//     setCurrentParentsOccupation(item);
//     setOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteParentsOccupation(id);
//       fetchParentsOccupations();
//     } catch (error) {
//       console.error('Error deleting parents occupation:', error);
//     }
//   };

//   const handleSave = async () => {
//     if (!currentParentsOccupation) return;

//     try {
//       if (currentParentsOccupation.id) {
//         await updateParentsOccupation(currentParentsOccupation.id, currentParentsOccupation);
//       } else {
//         await addParentsOccupation(currentParentsOccupation);
//       }
//       fetchParentsOccupations();
//       handleClose();
//     } catch (error) {
//       console.error('Error saving parents occupation:', error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentParentsOccupation(null);
//   };

//   return (
//     <>
//       <Reuse
//         data={parentsOccupations}
//         columns={columns}
//         handleSearchChange={handleSearchChange}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//         setShowPopup={setOpen}
//         idField="id"
//         title="Parents Occupations"
//       />

//       {/* <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{currentParentsOccupation?.id ? 'Edit' : 'Add'} Parents Occupation</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Occupation"
//             fullWidth
//             value={currentParentsOccupation?.occupation || ''}
//             onChange={(e) =>
//               setCurrentParentsOccupation((prev) => ({
//                 ...(prev || { id: '' }),
//                 occupation: e.target.value,
//               }))
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog> */}

// {open && (
//           <Dialog
//             open={open}
//             onClose={() => setOpen(false)}
//             maxWidth="sm"
//             sx={{ background: '#f5f0ef ' }}
//           >
//             <Box>
//               <DialogTitle
//                 style={{
//                   color: 'red',
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   marginTop: '20px',
//                   fontSize: '50px',
//                 }}
//               >
//                {currentParentsOccupation?.id ? 'Edit' : 'Add'}
//               </DialogTitle>
//             </Box>
//             <DialogContent style={{ padding: '50px 50px' }}>
//               <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
//                 <Grid item xs={12} sm={12}>
//                   <TextField
//                     label="Occupation"
//                     value={currentParentsOccupation?.occupation || ''}
//                     onChange={(e) =>
//                       setCurrentParentsOccupation((prev) => ({
//                         ...(prev || { id: '' }),
//                         occupation: e.target.value,
//                       }))
//                     }
//                     fullWidth
//                   />
//                 </Grid>
              
//               </Grid>
//             </DialogContent>
//             <DialogActions style={{ marginRight: '43px' }}>
//               <Button
//                 style={{
//                   background: '#FFFDFF',
//                   color: 'red',
//                   boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 }}
//                 onClick={() => setOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 style={{
//                   background: 'red',
//                   color: 'white',
//                   boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//                 }}
//                 onClick={handleSave} disabled={!newRasi.trim()}
//               >
//                 {currentParentsOccupation ? 'Update' : 'Submit'}
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
//     </>
//   );
// };

// export default ParentsOccupationTable;


// import React, { useEffect, useState } from 'react';
// import {
//   Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid,
// } from '@mui/material';

// import {
//   getParentsOccupations, addParentsOccupation, updateParentsOccupation, deleteParentsOccupation,
// } from '../services/api';
// import Reuse from './Basic/Reuse';

// interface ParentsOccupation {
//   id: string;
//   occupation: string;
// }
// interface ColumnConfig<T> {
//     field: keyof T;
//     headerName: string;
//     sortable: boolean;
//   }
// const columns: ColumnConfig<ParentsOccupation>[] = [
//   { field: 'id', headerName: 'ID', sortable: true },
//   { field: 'occupation', headerName: 'Occupation', sortable: true },
// ];

// const ParentsOccupationTable: React.FC = () => {
//   const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentParentsOccupation, setCurrentParentsOccupation] = useState<ParentsOccupation | null>(null);

//   useEffect(() => {
//     fetchParentsOccupations();
//   }, []);

//   const fetchParentsOccupations = async () => {
//     try {
//       const response = await getParentsOccupations();
//       setParentsOccupations(response.data);
//     } catch (error) {
//       console.error('Error fetching parents occupations:', error);
//     }
//   };

//   const handleSearchChange = (query: string) => {
//     // Add search functionality here if required
//   };

//   const handleEdit = (item: ParentsOccupation) => {
//     setCurrentParentsOccupation(item);
//     setOpen(true);
//   };

//   const handleAdd = () => {
//     setCurrentParentsOccupation(null);  // Reset to null for adding new occupation
//     setOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteParentsOccupation(id);
//       fetchParentsOccupations();
//     } catch (error) {
//       console.error('Error deleting parents occupation:', error);
//     }
//   };

//   const handleSave = async () => {
//     if (!currentParentsOccupation) return;

//     try {
//       if (currentParentsOccupation.id) {
//         await updateParentsOccupation(currentParentsOccupation.id, currentParentsOccupation);
//       } else {
//         await addParentsOccupation(currentParentsOccupation);
//       }
//       fetchParentsOccupations();
//       handleClose();
//     } catch (error) {
//       console.error('Error saving parents occupation:', error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentParentsOccupation(null);
//   };

//   return (
//     <>
//       <Reuse
//         data={parentsOccupations}
//         columns={columns}
//         handleSearchChange={handleSearchChange}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//         setShowPopup={handleAdd}  // For adding new occupation
//         idField="id"
//         title="Parents Occupations"
//       />

//       {open && (
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           maxWidth="sm"
//           sx={{ background: '#f5f0ef ' }}
//         >
//           <Box>
//             <DialogTitle
//               style={{
//                 color: 'red',
//                 textAlign: 'center',
//                 fontWeight: 'bold',
//                 marginTop: '20px',
//                 fontSize: '50px',
//               }}
//             >
//               {currentParentsOccupation ? 'Edit Parents Occupation' : 'Add Parents Occupation'}
//             </DialogTitle>
//           </Box>
//           <DialogContent style={{ padding: '50px 50px' }}>
//             <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
//               <Grid item xs={12} sm={12}>
//                 <TextField
//                   label="Occupation"
//                   value={currentParentsOccupation?.occupation || ''}
//                   onChange={(e) =>
//                     setCurrentParentsOccupation((prev) => ({
//                       ...(prev || { id: '' }),
//                       occupation: e.target.value,
//                     }))
//                   }
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions style={{ marginRight: '43px' }}>
//             <Button
//               style={{
//                 background: '#FFFDFF',
//                 color: 'red',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//               }}
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//             <Button
//               style={{
//                 background: 'red',
//                 color: 'white',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//               }}
//               onClick={handleSave}
//               disabled={!currentParentsOccupation?.occupation?.trim()} // Disable button if occupation is empty
//             >
//               {currentParentsOccupation ? 'Update' : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </>
//   );
// };

// export default ParentsOccupationTable;


// import React, { useEffect, useState } from 'react';
// import {
//   Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid,
// } from '@mui/material';
// import axios from 'axios';
// import Reuse from './Basic/Reuse';

// interface ParentsOccupation {
//   id: string;
//   occupation: string;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const columns: ColumnConfig<ParentsOccupation>[] = [
//   { field: 'id', headerName: 'ID', sortable: true },
//   { field: 'occupation', headerName: 'Occupation', sortable: true },
// ];

// const ParentsOccupationTable: React.FC = () => {
//   const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentParentsOccupation, setCurrentParentsOccupation] = useState<ParentsOccupation | null>(null);

//   useEffect(() => {
//     fetchParentsOccupations();
//   }, []);

//   const fetchParentsOccupations = async () => {
//     try {
//       const response = await axios.get('http://103.214.132.20:8000/api/parents-occupations/');
//       setParentsOccupations(response.data);
//     } catch (error) {
//       console.error('Error fetching parents occupations:', error);
//     }
//   };

//   const handleEdit = (item: ParentsOccupation) => {
//     setCurrentParentsOccupation(item);
//     setOpen(true);
//   };

//   const handleAdd = () => {
//     setCurrentParentsOccupation({ id: '', occupation: '' });  // Reset form for new entry
//     setOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`http://103.214.132.20:8000/api/parents-occupations/${id}`);
//       setParentsOccupations(prev => prev.filter(occupation => occupation.id !== id)); // Optimistic update
//     } catch (error) {
//       console.error('Error deleting parents occupation:', error);
//     }
//   };

//   const handleSave = async () => {
//     if (!currentParentsOccupation) return;

//     try {
//       if (currentParentsOccupation.id) {
//         // Update existing occupation
//         const response = await axios.put(
//           `http://103.214.132.20:8000/api/parents-occupations/${currentParentsOccupation.id}`,
//           currentParentsOccupation
//         );
//         setParentsOccupations(prev => prev.map(occupation => 
//           occupation.id === currentParentsOccupation.id ? response.data : occupation
//         ));
//       } else {
//         // Add new occupation
//         const response = await axios.post(
//           `http://103.214.132.20:8000/api/parents-occupations/`,
//           currentParentsOccupation
//         );
//         setParentsOccupations(prev => [...prev, response.data]); // Add to list
//       }
//       handleClose();
//     } catch (error) {
//       console.error('Error saving parents occupation:', error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentParentsOccupation(null);
//   };

//   return (
//     <>
//       <Reuse
//         data={parentsOccupations}
//         columns={columns}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//         setShowPopup={handleAdd}  // For adding new occupation
//         idField="id"
//         title="Parents Occupations"
//       />

//       {open && (
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           maxWidth="sm"
//           sx={{ background: '#f5f0ef ' }}
//         >
//           <Box>
//             <DialogTitle
//               style={{
//                 color: 'red',
//                 textAlign: 'center',
//                 fontWeight: 'bold',
//                 marginTop: '20px',
//                 fontSize: '50px',
//               }}
//             >
//               {currentParentsOccupation?.id ? 'Edit Parents Occupation' : 'Add Parents Occupation'}
//             </DialogTitle>
//           </Box>
//           <DialogContent style={{ padding: '50px 50px' }}>
//             <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
//               <Grid item xs={12} sm={12}>
//                 <TextField
//                   label="Occupation"
//                   value={currentParentsOccupation?.occupation || ''}
//                   onChange={(e) =>
//                     setCurrentParentsOccupation(prev => ({
//                       ...(prev || { id: '' }),
//                       occupation: e.target.value,
//                     }))
//                   }
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions style={{ marginRight: '43px' }}>
//             <Button
//               style={{
//                 background: '#FFFDFF',
//                 color: 'red',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//               }}
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//             <Button
//               style={{
//                 background: 'red',
//                 color: 'white',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//               }}
//               onClick={handleSave}
//               disabled={!currentParentsOccupation?.occupation?.trim()} // Disable button if occupation is empty
//             >
//               {currentParentsOccupation?.id ? 'Update' : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </>
//   );
// };

// export default ParentsOccupationTable;

// import React, { useEffect, useState } from 'react';
// import {
//   Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid, Typography,
// } from '@mui/material';
// import axios from 'axios';
// import Reuse from './Basic/Reuse';
// import Notification, { notify } from './TostNotification';

// interface ParentsOccupation {
//   id: string;
//   occupation: string;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const columns: ColumnConfig<ParentsOccupation>[] = [
//   { field: 'id', headerName: 'ID', sortable: true },
//   { field: 'occupation', headerName: 'Occupation', sortable: true },
// ];

// const ParentsOccupationTable: React.FC = () => {
//   const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentParentsOccupation, setCurrentParentsOccupation] = useState<ParentsOccupation | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [selectedIdForDelete, setSelectedIdForDelete] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchParentsOccupations();
//   }, []);

//   const fetchParentsOccupations = async () => {
//     try {
//       const response = await axios.get('http://103.214.132.20:8000/api/parents-occupations/');
//       setParentsOccupations(response.data);
//     } catch (error) {
//       console.error('Error fetching parents occupations:', error);
//     }
//   };

//   const handleAdd = () => {
//     setCurrentParentsOccupation({ id: '', occupation: '' });  // Reset form for new entry
//     setOpen(true);
//   };

//   const handleEdit = (item: ParentsOccupation) => {
//     setCurrentParentsOccupation(item);
//     setOpen(true);
//   };

//   const handleDelete = (id: string) => {
//     setSelectedIdForDelete(id);
//     setDeleteConfirmation(true);
//   };

//   const confirmDeleteRasi = async () => {
//     if (!selectedIdForDelete) return;
    
//     try {
//       const response = await axios.delete(`http://103.214.132.20:8000/api/parents-occupations/${selectedIdForDelete}`);
//       if (response.status >= 200 && response.status <= 299) {
//         setParentsOccupations(prev => prev.filter(occupation => occupation.id !== selectedIdForDelete));
//         notify('Successfully Deleted');
//       }
//       setDeleteConfirmation(false);
//       setSelectedIdForDelete(null);
//     } catch (error) {
//       console.error('Error deleting parents occupation:', error);
//     }
//   };

//   const handleSave = async () => {
//     if (!currentParentsOccupation) return;

//     try {
//       if (currentParentsOccupation.id) {
//         // Update existing occupation
//         const response = await axios.put(
//           `http://103.214.132.20:8000/api/parents-occupations/${currentParentsOccupation.id}`,
//           currentParentsOccupation
//         );
//         if (response.status >= 200 && response.status <= 299) {
//           setParentsOccupations(prev =>
//             prev.map(occupation => occupation.id === currentParentsOccupation.id ? response.data : occupation)
//           );
//           notify('Successfully updated');
//         }
//       } else {
//         // Add new occupation
//         const response = await axios.post(
//           `http://103.214.132.20:8000/api/parents-occupations/`,
//           currentParentsOccupation
//         );
//         if (response.status >= 200 && response.status <= 299) {
//           setParentsOccupations(prev => [...prev, response.data]);
//           notify('Successfully added');
//         }
//       }
//       handleClose();
//     } catch (error) {
//       console.error('Error saving parents occupation:', error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentParentsOccupation(null);
//   };

//   const handleSearchChange = (query: string) => {
//     setSearchQuery(query);
//   };

//   const filteredOccupations = parentsOccupations.filter((occupation) =>
//     occupation.occupation.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <Reuse
//         data={filteredOccupations}
//         columns={columns}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//         setShowPopup={handleAdd}  // For adding new occupation
//         idField="id"
//         title="Parents Occupations"
//         handleSearchChange={handleSearchChange}
//       />

//       {deleteConfirmation && (
//         <Dialog
//           open={deleteConfirmation}
//           onClose={() => setDeleteConfirmation(false)}
//         >
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             <Typography>Are you sure you want to delete this Occupation?</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteConfirmation(false)}>
//               Cancel
//             </Button>
//             <Button onClick={confirmDeleteRasi} color="secondary">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       {open && (
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           maxWidth="sm"
//           sx={{ background: '#f5f0ef ' }}
//         >
//           <Box>
//             <DialogTitle
//               style={{
//                 color: 'red',
//                 textAlign: 'center',
//                 fontWeight: 'bold',
//                 marginTop: '20px',
//                 fontSize: '50px',
//               }}
//             >
//               {currentParentsOccupation?.id ? 'Edit Parents Occupation' : 'Add Parents Occupation'}
//             </DialogTitle>
//           </Box>
//           <DialogContent style={{ padding: '50px 50px' }}>
//             <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
//               <Grid item xs={12} sm={12}>
//                 <TextField
//                   label="Occupation"
//                   value={currentParentsOccupation?.occupation || ''}
//                   onChange={(e) =>
//                     setCurrentParentsOccupation(prev => ({
//                       ...(prev || { id: '' }),
//                       occupation: e.target.value,
//                     }))
//                   }
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions style={{ marginRight: '43px' }}>
//             <Button
//               style={{
//                 background: '#FFFDFF',
//                 color: 'red',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//               }}
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//             <Button
//               style={{
//                 background: 'red',
//                 color: 'white',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//               }}
//               onClick={handleSave}
//               disabled={!currentParentsOccupation?.occupation?.trim()} // Disable button if occupation is empty
//             >
//               {currentParentsOccupation?.id ? 'Update' : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//       <Notification/>
//     </>
//   );
// };

// export default ParentsOccupationTable;

// import React, { useEffect, useState } from 'react';
// import {
//   Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid, Typography, Container
// } from '@mui/material';
// import axios from 'axios';
// import Reuse from './Basic/Reuse';
// import Notification, { notify, notifyDelete } from './TostNotification';
// import { addParentsOccupation, deleteParentsOccupation, getParentsOccupations, updateParentsOccupation } from '../services/api';
// import TablePopUp from './TablePopUp';

// interface ParentsOccupation {
//   id: string;
//   occupation: string;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const columns: ColumnConfig<ParentsOccupation>[] = [
//   { field: 'id', headerName: 'ID', sortable: true },
//   { field: 'occupation', headerName: 'Occupation', sortable: true },
// ];

// const ParentsOccupationTable: React.FC = () => {
//   const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentParentsOccupation, setCurrentParentsOccupation] = useState<ParentsOccupation | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [selectedIdForDelete, setSelectedIdForDelete] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchParentsOccupations();
//   }, []);

//   const fetchParentsOccupations = async () => {
//     try {
//       const response = await getParentsOccupations();
//       setParentsOccupations(response.data);
//     } catch (error) {
//       console.error('Error fetching parents occupations:', error);
//     }
//   };

//   const handleAdd = () => {
//     setCurrentParentsOccupation({ id: '', occupation: '' });
//     setOpen(true);
//   };

//   const handleEdit = (item: ParentsOccupation) => {
//     setCurrentParentsOccupation(item);
//     setOpen(true);
//   };
//   const clearValues = () => {
    
//     setCurrentParentsOccupation(null);
//     setOpen(false);
//   }
//   const handleDelete = (id: string) => {
//     setSelectedIdForDelete(id);
//     setDeleteConfirmation(true);
//   };

//   const confirmDeleteOccupation = async (id: string) => {
//     if (!selectedIdForDelete) return;
    
//     try {
//       const response =   await deleteParentsOccupation(id);
//       if (response.status >= 200 && response.status <= 299) {
//         setParentsOccupations(prev => prev.filter(occupation => occupation.id !== selectedIdForDelete));
//         notifyDelete('Successfully Deleted');
//       }
//       setDeleteConfirmation(false);
//       setSelectedIdForDelete(null);
//     } catch (error) {
//       console.error('Error deleting parents occupation:', error);
//     }
//   };

//   const handleSave = async () => {
//     if (!currentParentsOccupation) return;
  
//     try {
//       if (currentParentsOccupation.id) {  // If the occupation has an ID, it's an update
//         const response =   await updateParentsOccupation(currentParentsOccupation.id, currentParentsOccupation);
//         if (response.status >= 200 && response.status <= 299) {
//           setParentsOccupations(prev =>
//             prev.map(occupation => occupation.id === currentParentsOccupation.id ? response.data : occupation)
//           );
//           notify('Successfully updated');
//         }
//       } else {  // If there's no ID, it's a new occupation, so add it
//         const response =  await addParentsOccupation(currentParentsOccupation);
//         if (response.status >= 200 && response.status <= 299) {
//           setParentsOccupations(prev => [...prev, response.data]);
//           notify('Successfully added');
//         }
//       }
//       handleClose();
//     } catch (error) {
//       console.error('Error saving parents occupation:', error);
//     }
//   };
  

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentParentsOccupation(null);
//   };

//   const handleSearchChange = (query: string) => {
//     setSearchQuery(query);
//   };

//   const filteredOccupations = parentsOccupations.filter((occupation) =>
//     occupation.occupation.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Container
//     style={{
//       backgroundColor: 'white',
//       padding: '20px',
//       width: '100%',
//       maxWidth: '100vw',
//       boxSizing: 'border-box',
//     }}
//   >
//     <div
//       style={{
//         backgroundColor: 'white',
//         padding: '20px',
//         borderRadius: '8px',
//       }}
//     >
//       <Reuse
//         data={filteredOccupations}
//         columns={columns}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//         setShowPopup={handleAdd}
//         idField="id"
//         title="Parents Occupations"
//         handleSearchChange={handleSearchChange}
//       />

// <TablePopUp
//           setShowPopup={setOpen}
//           showPopup={open}
//           clearValues={clearValues}
//           handleAddOrUpdate={handleSave}
//           EditId={editp}
//           valueOne={currentParentsOccupation}
//           setValueOne={s}

//           labelOne={'Birth Star'}

//           addMsg="Add Parents Occupation"
//           editMsg="Edit Parents Occupation"
//           deleteConfirmation={deleteConfirmation}
//           setDeleteConfirmation={setDeleteConfirmation}
//           deletFun={confirmDeleteOccupation}
//           deletLabel="Are you sure you want to delete this Lagnam?" setValueTwo={function (_value: string): void {
//             throw new Error('Function not implemented.');
//           } } setValueThree={function (_value: string): void {
//             throw new Error('Function not implemented.');
//           } } setValueFour={function (_value: string): void {
//             throw new Error('Function not implemented.');
//           } } valueFour={null} labelTwo={''} LabelThree={''} LabelFour={''}        />
// </div>

//       <Notification />
//     </Container>
//   );
// };

// export default ParentsOccupationTable;


import React, { useEffect, useState, useMemo } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Container, Typography
} from '@mui/material';
import Notification, { notify, notifyDelete } from './TostNotification';
import { addParentsOccupation, deleteParentsOccupation, getParentsOccupations, updateParentsOccupation } from '../services/api';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp'; // Assuming you have a reusable popup component

interface ParentsOccupation {
  id: string;
  occupation: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const ParentsOccupationTable: React.FC = () => {
  const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
  const [newOccupation, setNewOccupation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [editOccupationId, setEditOccupationId] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [occupationToDelete, setOccupationToDelete] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    fetchParentsOccupations();
  }, []);

  const fetchParentsOccupations = async () => {
    try {
      const response = await getParentsOccupations();
      setParentsOccupations(response.data);
    } catch (error) {
      console.error('Error fetching parents occupations:', error);
    }
  };

  const addOrUpdateOccupation = async () => {
    const occupationData = { occupation: newOccupation };

    try {
      if (editOccupationId) {
        const response = await updateParentsOccupation(editOccupationId, occupationData);
        if (response.status >= 200 && response.status <= 299) {
          notify('Successfully updated');
          fetchParentsOccupations();
        }
      } else {
        const response = await addParentsOccupation(occupationData);
        if (response.status >= 200 && response.status <= 299) {
          notify('Successfully added');
          fetchParentsOccupations();
        }
      }

      setNewOccupation('');
      setShowPopup(false);
      setEditOccupationId(null);
    } catch (error) {
      console.error('Error adding/updating occupation:', error);
    }
  };

  const handleEditOccupation = (occupation: ParentsOccupation) => {
    setEditOccupationId(occupation.id);
    setNewOccupation(occupation.occupation);
    setShowPopup(true);
  };
  const clearValues = () => {
    setEditOccupationId(null);
    setNewOccupation('');
    setShowPopup(false);
  }
  const handleDeleteOccupation = (id: string) => {
    setOccupationToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteOccupation = async () => {
    if (occupationToDelete) {
      try {
        const response = await deleteParentsOccupation(occupationToDelete);
        if (response.status >= 200 && response.status <= 299) {
          notifyDelete('Successfully Deleted');
          fetchParentsOccupations();
        }
        setOccupationToDelete(null);
        setDeleteConfirmation(false);
      } catch (error) {
        console.error('Error deleting occupation:', error);
      }
    }
  };

  const columns: ColumnConfig<ParentsOccupation>[] = useMemo(() => [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'occupation', headerName: 'Occupation', sortable: true },
  ], []);

  const filteredOccupations = parentsOccupations.filter((occupation) =>
    occupation.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container style={{ backgroundColor: 'white', padding: '20px' }}>
      <Reuse
        data={filteredOccupations}
        columns={columns}
        handleSearchChange={setSearchQuery}
        handleEdit={handleEditOccupation}
        handleDelete={(id) => handleDeleteOccupation(String(id))}
        setShowPopup={setShowPopup}
        idField="id"
        title="Parents Occupations"
      />

      <TablePopUp
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        clearValues={clearValues}
        // clearValues={() => { setNewOccupation(''); setEditOccupationId(null); } }
        handleAddOrUpdate={addOrUpdateOccupation}
        EditId={editOccupationId ? Number(editOccupationId) : null}
        valueOne={newOccupation}
        setValueOne={setNewOccupation}
        labelOne="Occupation"
        addMsg="Add Occupation"
        editMsg="Edit Occupation"
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        deletFun={confirmDeleteOccupation}
        deletLabel="Are you sure you want to delete this occupation?" setValueTwo={function (_value: string): void {
          throw new Error('Function not implemented.');
        } } setValueThree={function (_value: string): void {
          throw new Error('Function not implemented.');
        } } setValueFour={function (_value: string): void {
          throw new Error('Function not implemented.');
        } } valueFour={null} labelTwo={''} LabelThree={''} LabelFour={''}      />

      <Notification />
    </Container>
  );
};

export default ParentsOccupationTable;
