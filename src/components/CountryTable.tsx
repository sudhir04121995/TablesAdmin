
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Container,
//   Typography,
//   Box,
//   Grid,
// } from '@mui/material';
// import { getCountries, addCountry, updateCountry, deleteCountry } from '../services/api';
// import Reuse from './Basic/Reuse';
// import Notification, { notify, notifyDelete } from './TostNotification';

// interface Country {
//   id: number;
//   name: string;
//   is_active: boolean;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const CountryTable: React.FC = () => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [newCountryName, setNewCountryName] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [editCountryId, setEditCountryId] = useState<number | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [countryToDelete, setCountryToDelete] = useState<number | null>(null);

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   const fetchCountries = async () => {
//     const response = await getCountries();
//     setCountries(response.data);
//     console.log(countries,"countries")
//   };

//   const addOrUpdateCountry = async () => {
//     const countryData = { name: newCountryName, is_active: true };
//     if (editCountryId) {
//       const response = await updateCountry(editCountryId.toString(), countryData);
//       if (response.status >= 200 && response.status <= 201) {
//         notify('Country updated successfully');
//       }
//     } else {
//       const response = await addCountry(countryData);
//       if (response.status >= 200 && response.status <= 201) {
//         notify('Country added successfully');
//       }
//     }
//     setNewCountryName('');
//     setShowPopup(false);
//     setEditCountryId(null);
//     fetchCountries();
//   };

//   const handleEditCountry = (country: Country) => {
//     setEditCountryId(country.id);
//     setNewCountryName(country.name);
//     setShowPopup(true);
//   };

// //   const confirmDeleteCountry = async () => {
// //     if (countryToDelete !== null) {
// //       const response = await deleteCountry(countryToDelete.toString());
// //       if (response.status >= 200 && response.status <= 201) {
// //         notifyDelete('Country deleted successfully');
// //       }
// //       setCountryToDelete(null);
// //       setDeleteConfirmation(false);
// //       fetchCountries();
// //     }
// //   };

// const handleDeleteCountry = (countryId: number) => {
//     setCountryToDelete(countryId);
//     setDeleteConfirmation(true);
//   };
  
//   const confirmDeleteCountry = async () => {
//     if (countryToDelete !== null) {
//       const response = await deleteCountry(countryToDelete.toString());
//       if (response.status >= 200 && response.status <= 201) {
//         notifyDelete('Country deleted successfully');
//       }
//       setCountryToDelete(null);
//       setDeleteConfirmation(false);
//       fetchCountries();
//     } else {
//       console.error("No country selected for deletion.");
//     }
//   };
  
//   const columns: ColumnConfig<Country>[] = useMemo(() => [
//     { field: 'id', headerName: 'ID', sortable: true },
//     { field: 'name', headerName: 'Country Name', sortable: true },
//     { field: 'is_active', headerName: 'Status', sortable: true },
//   ], []);

// //   const handleDeleteCountry = (country: Country) => {
// //     setCountryToDelete(country.id);
// //     setDeleteConfirmation(true);
// //   };

// const handleSearchChange = (searchText: string) => {
//     // Filter the countries based on the searchText
//     const filteredCountries = countries.filter((country) =>
//       country.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setCountries(filteredCountries);
//   };
  
//   return (
//     <Container style={{ backgroundColor: 'white', padding: '20px' }}>
//       <Reuse
//         data={countries}
//         columns={columns}
//         handleEdit={handleEditCountry}
//         handleSearchChange={handleSearchChange}
//         handleDelete={(country) => handleDeleteCountry(country.id)}
//         setShowPopup={setShowPopup}
//         idField="id"
//         title="Country List"
//       />

//       {showPopup && (
//         <Dialog
//           open={showPopup}
//           onClose={() => setShowPopup(false)}
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
//               {editCountryId ? 'Edit Country' : 'Add Country'}
//             </DialogTitle>
//           </Box>
//           <DialogContent style={{ padding: '50px 50px' }}>
//             <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
//               <Grid item xs={12} sm={12}>
//                 <TextField
//                   label="Country Name"
//                   value={newCountryName}
//                   onChange={(e) => setNewCountryName(e.target.value)}
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
//               onClick={() => setShowPopup(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               style={{
//                 background: 'red',
//                 color: 'white',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//               }}
//               onClick={addOrUpdateCountry}
//               disabled={!newCountryName.trim()}
//             >
//               {editCountryId ? 'Update' : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       {deleteConfirmation && (
//         <Dialog
//           open={deleteConfirmation}
//           onClose={() => setDeleteConfirmation(false)}
//         >
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             <Typography>
//               Are you sure you want to delete this country?
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteConfirmation(false)}>
//               Cancel
//             </Button>
//             <Button onClick={confirmDeleteCountry} color="secondary">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       <Notification />
//     </Container>
//   );
// };

// export default CountryTable;



import React, { useState, useEffect, useMemo } from 'react';
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
  Grid,
} from '@mui/material';
import { getCountries, addCountry, updateCountry, deleteCountry } from '../services/api';
import Reuse from './Basic/Reuse';
import Notification, { notify, notifyDelete } from './TostNotification';
import TablePopUp from './TablePopUp';

interface Country {
  id: number;
  name: string;
  is_active: boolean;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const CountryTable: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountryName, setNewCountryName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [editCountryId, setEditCountryId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const response = await getCountries();
    setCountries(response.data);
    console.log(countries,"countries")
  };

  const addOrUpdateCountry = async () => {
    const countryData = { name: newCountryName, is_active: true };
    if (editCountryId) {
      const response = await updateCountry(editCountryId.toString(), countryData);
      if (response.status >= 200 && response.status <= 201) {
        notify('Country updated successfully');
      }
    } else {
      const response = await addCountry(countryData);
      if (response.status >= 200 && response.status <= 201) {
        notify('Country added successfully');
      }
    }
    setNewCountryName('');
    setShowPopup(false);
    setEditCountryId(null);
    fetchCountries();
  };
  const clearValues = () => {
   
    setEditCountryId(null);
    setNewCountryName('');
    setShowPopup(false);
  }
  const handleEditCountry = (country: Country) => {
    setEditCountryId(country.id);
    setNewCountryName(country.name);
    setShowPopup(true);
  };

//   const confirmDeleteCountry = async () => {
//     if (countryToDelete !== null) {
//       const response = await deleteCountry(countryToDelete.toString());
//       if (response.status >= 200 && response.status <= 201) {
//         notifyDelete('Country deleted successfully');
//       }
//       setCountryToDelete(null);
//       setDeleteConfirmation(false);
//       fetchCountries();
//     }
//   };

const handleDeleteCountry = (countryId: number) => {
    setCountryToDelete(countryId);
    setDeleteConfirmation(true);
  };
  
  const confirmDeleteCountry = async () => {
    if (countryToDelete !== null) {
      const response = await deleteCountry(countryToDelete.toString());
      if (response.status >= 200 && response.status <= 201) {
        notifyDelete('Country deleted successfully');
      }
      setCountryToDelete(null);
      setDeleteConfirmation(false);
      fetchCountries();
    } else {
      console.error("No country selected for deletion.");
    }
  };
  
  const columns: ColumnConfig<Country>[] = useMemo(() => [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'Country Name', sortable: true },
    { field: 'is_active', headerName: 'Status', sortable: true },
  ], []);

//   const handleDeleteCountry = (country: Country) => {
//     setCountryToDelete(country.id);
//     setDeleteConfirmation(true);
//   };

const handleSearchChange = (searchText: string) => {
    // Filter the countries based on the searchText
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setCountries(filteredCountries);
  };
  
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
        data={countries}
        columns={columns}
        handleEdit={handleEditCountry}
        handleSearchChange={handleSearchChange}
        handleDelete={(country) => handleDeleteCountry(country.id)}
        setShowPopup={setShowPopup}
        idField="id"
        title="Country List"
      />

     
<TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={addOrUpdateCountry}
          EditId={editCountryId}
          valueOne={newCountryName}
          setValueOne={setNewCountryName}

          labelOne={'Country'}

          addMsg="Add Country List"
          editMsg="Edit Country List"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteCountry}
          deletLabel="Are you sure you want to delete this Country ?" setValueTwo={function (_value: string): void {
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

export default CountryTable;
