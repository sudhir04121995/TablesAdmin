


// import React, { useEffect, useState } from 'react';

// import { Container } from '@mui/material';
// import Notification, { notify, notifyDelete } from './TostNotification';
// import Reuse from './Basic/Reuse';
// import TablePopUp from './TablePopUp';
// import {
  
//   getComplexion,
//   updateComplexions,
//   deleteComplexions,
//   addComplection
// } from '../services/api';

// interface complexion {
//   id: number;
//   Complexion: string;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const ComplectionTable: React.FC = () => {
//   const [complexions, setcomplexions] = useState<complexion[]>([]);
//   const [newcomplexion, setNewcomplexion] = useState<string | null>('');
//   const [editcomplexionId, setEditcomplexionId] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showPopup, setShowPopup] = useState(false);
//   const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
//   const [complexionToDelete, setcomplexionToDelete] = useState<number | null>(null);

//   // Fetch family values when component mounts
//   useEffect(() => {
//     fetchcomplexions();
//   }, []);

//   const fetchcomplexions = async () => {
//     try {
//       const response = await getComplexion();
//       setcomplexions(response.data.map((item: { complexionid: any; complexion: any; }) => ({
//         id: item.complexionid,  // Map the correct ID field
//         complexion: item.complexion  // Ensure correct field name
//       })));
//     } catch (error) {
//       console.error('Error fetching family values:', error);
//     }
//   };

//   // Add or update a family value
//   const handleAddOrUpdatecomplexion = async () => {
//     try {
//       if (editcomplexionId) {
//         // Update the family value
//         await updateComplexions(editcomplexionId.toString(), { complexion: newcomplexion });
//         notify('Successfully updated');
//       } else {
//         if (newcomplexion) {
//           // Add a new family value
//           await addComplection({ complexion: newcomplexion });
//           notify('Family Value Added Successfully');
//         } else {
//           notifyDelete('Please submit all required fields');
//         }
//       }
//       setNewcomplexion('');
//       setEditcomplexionId(null);
//       setShowPopup(false);
//       fetchcomplexions();  // Refresh the list
//     } catch (error) {
//       console.error('Error adding/updating family value:', error);
//     }
//   };

//   // Delete a family value
//   const handleDeletecomplexion = async (id: number) => {
//     try {
//       await deleteComplexions(id.toString());
//       notifyDelete('Successfully Deleted');
//       fetchcomplexions();  // Refresh the list
//     } catch (error) {
//       console.error('Error deleting family value:', error);
//     }
//   };

//   // Set the family value to be deleted and show confirmation
//   const handleDeleteType = (id: number) => {
//     setcomplexionToDelete(id);
//     setDeleteConfirmation(true);
//   };

//   // Confirm and delete the selected family value
//   const confirmDeleteType = async () => {
//     if (complexionToDelete !== null) {
//       await handleDeletecomplexion(complexionToDelete);
//       setcomplexionToDelete(null);
//       setDeleteConfirmation(false);
//     }
//   };

//   // Handle editing a family value
//   const handleEditType = (value: complexion) => {
//     setEditcomplexionId(value.id);
//     setNewcomplexion(value.complexion);
//     setShowPopup(true);
//   };

//   // Clear form values
//   const clearValues = () => {
//     setEditcomplexionId(null);
//     setNewcomplexion('');
//     setShowPopup(false);
//   };

//   // Define the columns for the table
//   const columns: ColumnConfig<complexion>[] = [
//     { field: 'id', headerName: 'ID', sortable: true },
//     { field: 'Complexion', headerName: 'Complexion', sortable: true }
//   ];

//   return (
//     <Container
//       style={{
//         backgroundColor: 'white',
//         padding: '20px',
//         width: '100%',
//         maxWidth: '100vw',
//         boxSizing: 'border-box',
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: 'white',
//           padding: '20px',
//           borderRadius: '8px',
//         }}
//       >
//         <Reuse
//           data={complexions}
//           columns={columns}
//           handleSearchChange={(query) => setSearchQuery(query)}
//           handleEdit={handleEditType}
//           handleDelete={(id) => handleDeleteType(Number(id))}
//           setShowPopup={setShowPopup}
//           idField="id"
//           title="Complexion"
//         />
//         <TablePopUp
//           setShowPopup={setShowPopup}
//           showPopup={showPopup}
//           clearValues={clearValues}
//           handleAddOrUpdate={handleAddOrUpdatecomplexion}
//           EditId={editcomplexionId}
//           valueOne={newcomplexion}
//           setValueOne={setNewcomplexion}
//           labelOne={'Family Value'}
//           addMsg="Add Family Value"
//           editMsg="Edit Family Value"
//           deleteConfirmation={deleteConfirmation}
//           setDeleteConfirmation={setDeleteConfirmation}
//           deletFun={confirmDeleteType}
//           deletLabel="Are you sure you want to delete this family value?"
//           setValueTwo={() => {}}
//           valueTwo={null}
//           setValueThree={() => {}}
//           valueThree={null}
//           setValueFour={() => {}}
//           valueFour={null}
//           labelTwo={''}
//           LabelThree={''}
//           LabelFour={''}
//         />
//       </div>
//       <Notification />
//     </Container>
//   );
// };

// export default ComplectionTable;



import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Notification, { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import {
  getComplexion,
  updateComplexions,
  deleteComplexions,
  addComplection,
} from '../services/api';

interface Complexion {
  id: number;
  complexion_desc: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const ComplectionTable: React.FC = () => {
  const [complexions, setComplexions] = useState<Complexion[]>([]);
  const [newComplexion, setNewComplexion] = useState<string | null>('');
  const [editComplexionId, setEditComplexionId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [complexionToDelete, setComplexionToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchComplexions();
  }, []);

  const fetchComplexions = async () => {
    try {
      const response = await getComplexion();
      setComplexions(response.data.map((item: { complexion_id: number; complexion_desc: string }) => ({
        id: item.complexion_id,
        complexion_desc: item.complexion_desc,
      })));
    } catch (error) {
      console.error('Error fetching complexions:', error);
    }
  };

  const handleAddOrUpdateComplexion = async () => {
    try {
      if (editComplexionId) {
        await updateComplexions(editComplexionId.toString(), { complexion_desc: newComplexion! });
        notify('Successfully updated');
      } else {
        if (newComplexion) {
          await addComplection({ complexion_desc: newComplexion });
          notify('Complexion Added Successfully');
        } else {
          notifyDelete('Please submit all required fields');
        }
      }
      setNewComplexion('');
      setEditComplexionId(null);
      setShowPopup(false);
      fetchComplexions(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating complexion:', error);
    }
  };

  const handleDeleteComplexion = async (id: number) => {
    try {
      await deleteComplexions(id.toString());
      notifyDelete('Successfully Deleted');
      fetchComplexions(); // Refresh the list
    } catch (error) {
      console.error('Error deleting complexion:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setComplexionToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (complexionToDelete !== null) {
      await handleDeleteComplexion(complexionToDelete);
      setComplexionToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: Complexion) => {
    setEditComplexionId(value.id);
    setNewComplexion(value.complexion_desc);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditComplexionId(null);
    setNewComplexion('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<Complexion>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'complexion_desc', headerName: 'Complexion', sortable: true },
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
          data={complexions}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Complexion"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateComplexion}
          EditId={editComplexionId}
          valueOne={newComplexion}
          setValueOne={setNewComplexion}
          labelOne="Complexion"
          addMsg="Add Complexion"
          editMsg="Edit Complexion"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this complexion?"
          setValueTwo={() => {}}
          valueTwo={null}
          setValueThree={() => {}}
          valueThree={null}
          setValueFour={() => {}}
          valueFour={null}
          labelTwo=""
          LabelThree=""
          LabelFour=""
        />
      </div>
      <Notification />
    </Container>
  );
};

export default ComplectionTable;
