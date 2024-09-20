// import React, { useEffect, useMemo, useState } from 'react';
// import { apiService } from '../services/api';
// import { useTable } from 'react-table';
// import axios from 'axios';
// import {
//   Button,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   MenuItem,
//   Typography,
//   IconButton,
//   Pagination,
//   Paper
// } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

// interface DasaBalance {
//   id: number;
//   balance: string;
// }

// const DasaBalanceList: React.FC = () => {
//   const [dasaBalances, setDasaBalances] = useState<DasaBalance[]>([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [newDasaBalance, setNewDasaBalance] = useState('');
//   const [editDasaBalanceId, setEditDasaBalanceId] = useState<number | null>(null);
//   const [editedDasaBalance, setEditedDasaBalance] = useState('');
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortField, setSortField] = useState('balance');
//   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [balanceToDelete, setBalanceToDelete] = useState<number | null>(null);

//   useEffect(() => {
//     fetchDasaBalances();
//   }, []);

//   const fetchDasaBalances = async () => {
//     try {
//       const response = await axios.get('http://103.214.132.20:8000/api/dasa-balances/');
//       setDasaBalances(response.data);
//     } catch (error) {
//       console.error('Error fetching dasa balances:', error);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/accounts/dasa-balances/${id}/`);
//       fetchDasaBalances();
//     } catch (error) {
//       console.error('Error deleting dasa balance:', error);
//     }
//   };

//   const handleAddOrUpdateDasaBalance = async () => {
//     const balanceData = { balance: newDasaBalance };
//     if (editDasaBalanceId) {
//       await axios.put(`http://localhost:8000/api/accounts/dasa-balances/${editDasaBalanceId}/`, balanceData);
//     } else {
//       await axios.post('http://localhost:8000/api/accounts/dasa-balances/', balanceData);
//     }
//     setNewDasaBalance('');
//     setEditDasaBalanceId(null);
//     setShowPopup(false);
//     fetchDasaBalances();
//   };

//   const handleEditBalance = (balance: DasaBalance) => {
//     setEditDasaBalanceId(balance.id);
//     setNewDasaBalance(balance.balance);
//     setShowPopup(true);
//   };

//   const handleDeleteBalance = (id: number) => {
//     setBalanceToDelete(id);
//     setDeleteConfirmation(true);
//   };

//   const confirmDeleteBalance = async () => {
//     if (balanceToDelete !== null) {
//       await handleDelete(balanceToDelete);
//       setBalanceToDelete(null);
//       setDeleteConfirmation(false);
//     }
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   const handleSort = (field: string) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortField(field);
//       setSortDirection('asc');
//     }
//   };

//   const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
//     setCurrentPage(value);
//   };

//   const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setItemsPerPage(parseInt(event.target.value as string, 10));
//     setCurrentPage(1);
//   };

//   const filteredDasaBalances = dasaBalances.filter((dasaBalance) =>
//     dasaBalance.balance.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const sortedDasaBalances = [...filteredDasaBalances].sort((a, b) => {
//     const fieldA = a[sortField].toLowerCase();
//     const fieldB = b[sortField].toLowerCase();
//     if (fieldA < fieldB) {
//       return sortDirection === 'asc' ? -1 : 1;
//     }
//     if (fieldA > fieldB) {
//       return sortDirection === 'asc' ? 1 : -1;
//     }
//     return 0;
//   });

//   const paginatedDasaBalances = sortedDasaBalances.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <Container style={{ backgroundColor: 'white', padding: '20px' }}>
//       <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
//         <Typography variant="h4" gutterBottom>
//           Dasa Balances
//         </Typography>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//           <div>
//             <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
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
//               placeholder="Search Dasa Balance"
//               style={{ marginRight: '10px' }}
//             />
//             <Button onClick={() => setShowPopup(true)}>
//               <AddIcon />
//             </Button>
//           </div>
//         </div>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   style={{ cursor: 'pointer' }}
//                   onClick={() => handleSort('balance')}
//                 >
//                   Dasa Balance {sortField === 'balance' && (sortDirection === 'asc' ? '▲' : '▼')}
//                 </TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedDasaBalances.map((dasaBalance) => (
//                 <TableRow key={dasaBalance.id}>
//                   <TableCell>{dasaBalance.balance.charAt(0).toUpperCase() + dasaBalance.balance.slice(1)}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleEditBalance(dasaBalance)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton onClick={() => handleDeleteBalance(dasaBalance.id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
//           <Pagination
//             count={Math.ceil(filteredDasaBalances.length / itemsPerPage)}
//             page={currentPage}
//             onChange={handlePageChange}
//           />
//         </div>
//         {showPopup && (
//           <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
//             <DialogTitle>{editDasaBalanceId ? 'Edit Dasa Balance' : 'Add Dasa Balance'}</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Dasa Balance"
//                 value={newDasaBalance}
//                 onChange={(e) => setNewDasaBalance(e.target.value)}
//                 fullWidth
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setShowPopup(false)}>Cancel</Button>
//               <Button onClick={handleAddOrUpdateDasaBalance} disabled={!newDasaBalance.trim()}>
//                 {editDasaBalanceId ? 'Update' : 'Submit'}
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
//         {deleteConfirmation && (
//           <Dialog open={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
//             <DialogTitle>Confirm Delete</DialogTitle>
//             <DialogContent>
//               <Typography>Are you sure you want to delete this Dasa Balance?</Typography>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
//               <Button onClick={confirmDeleteBalance} color="secondary">
//                 Delete
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
//         {showSuccessPopup && (
//           <Dialog open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)}>
//             <DialogTitle>Success</DialogTitle>
//             <DialogContent>
//               <Typography>{editDasaBalanceId ? 'Dasa Balance updated successfully!' : 'Dasa Balance added successfully!'}</Typography>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setShowSuccessPopup(false)}>Close</Button>
//             </DialogActions>
//           </Dialog>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default DasaBalanceList;

import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Reuse from './Basic/Reuse';
import Notification, { notify, notifyDelete } from './TostNotification';
import TablePopUp from './TablePopUp';
import { Container } from '@mui/material';


interface DasaBalance {
  id: number;
  balance: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const DasaBalanceList: React.FC = () => {
  const [dasaBalances, setDasaBalances] = useState<DasaBalance[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newDasaBalance, setNewDasaBalance] = useState('');
  const [editDasaBalanceId, setEditDasaBalanceId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [balanceToDelete, setBalanceToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchDasaBalances();
  }, []);

  const fetchDasaBalances = async () => {
    try {
      const response = await axios.get('http://103.214.132.20:8000/api/dasa-balances/');
      setDasaBalances(response.data);
    } catch (error) {
      console.error('Error fetching dasa balances:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
     let response = await axios.delete(`http://103.214.132.20:8000/api/dasa-balances/${id}/`);
     if (response.status >= 200 || response.status <= 201) {
      notifyDelete('Successfully Deleted');
      fetchDasaBalances();
    }
      fetchDasaBalances();
    } catch (error) {
      console.error('Error deleting dasa balance:', error);
    }
  };

  const handleAddOrUpdateDasaBalance = async () => {
    const balanceData = { balance: newDasaBalance };
    
    if (editDasaBalanceId) {
     let response = await axios.put(`http://103.214.132.20:8000/api/dasa-balances/${editDasaBalanceId}/`, balanceData);
     if (response.status >= 200 || response.status <= 201) {
      notify('Successfully updated');
    }
    } else {
     let response = await axios.post('http://103.214.132.20:8000/api/dasa-balances/', balanceData);
     if (response.status >= 200 || response.status <= 201) {
      notify('Successfully updated');
    }
    }
    setNewDasaBalance('');
    setEditDasaBalanceId(null);
    setShowPopup(false);
    fetchDasaBalances();
  };

  const handleEdit = (item: DasaBalance) => {
    setEditDasaBalanceId(item.id);
    setNewDasaBalance(item.balance);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditDasaBalanceId(null);
    setNewDasaBalance('');
       setShowPopup(false);
     }

  const handleDeleteConfirm = (id: number) => {
    setBalanceToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (balanceToDelete !== null) {
      await handleDelete(balanceToDelete);
      setBalanceToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleSearchChange = (_query: string) => {
    // This is handled within Reuse, so you don't need to do anything here
  };

  const columns:ColumnConfig<DasaBalance>[] = [
    { field: 'balance', headerName: 'Dasa Balance', sortable: true },
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
        data={dasaBalances}
        columns={columns}
        handleSearchChange={handleSearchChange}
        handleEdit={handleEdit}
        handleDelete={(id) => handleDeleteConfirm(Number(id))} 
        setShowPopup={setShowPopup}
        idField="id"
        title="Dasa Balances"
      />

<TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateDasaBalance}
          EditId={editDasaBalanceId}
          valueOne={newDasaBalance}
          setValueOne={setNewDasaBalance}

          labelOne={'Birth Star'}

          addMsg="Add DasaBalance"
          editMsg="Edit DasaBalance"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDelete}
          deletLabel="Are you sure you want to delete this DasaBalance?" setValueTwo={function (_value: string): void {
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

export default DasaBalanceList;

