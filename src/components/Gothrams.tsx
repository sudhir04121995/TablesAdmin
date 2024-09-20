// import React, { useEffect, useState } from 'react';
// import { Container } from '@mui/material';
// import Notification, { notify, notifyDelete, } from './TostNotification';

// import TablePopUp from './TablePopUp';
// import { addGothram, deleteGothram, getGothrams, updateGothram } from '../services/api';
// import Reuse from './Basic/Reuse';

// interface Gothram {
//   id: number;
//   gothram_name: string;
//   rishi: string;
//   sanketha_namam: string;


//   description?: string;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const GothramTable: React.FC = () => {
//   const [gothrams, setGothrams] = useState<Gothram[]>([]);
//   const [newGothram, setNewGothram] = useState<string>('');
//   const [editGothramId, setEditGothramId] = useState<number | null>(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
//   const [gothramToDelete, setGothramToDelete] = useState<number | null>(null);

//   useEffect(() => {
//     fetchGothrams();
//   }, []);

//   const fetchGothrams = async () => {
//     try {
//       const response = await getGothrams();
//       setGothrams(response.data);
//     } catch (error) {
//       console.error('Error fetching gothrams:', error);
//     }
//   };

//   const handleAddOrUpdateGothram = async () => {
//     try {
//       if (editGothramId) {
//         await updateGothram(editGothramId.toString(), { name: newGothram });
//         notify('Successfully updated');
//       } else {
//         await addGothram({ name: newGothram });
//         notify('Gothram Added Successfully');
//       }
//       setNewGothram('');
//       setEditGothramId(null);
//       setShowPopup(false);
//       fetchGothrams(); // Refresh the list
//     } catch (error) {
//       console.error('Error adding/updating gothram:', error);
//     }
//   };

//   const handleDeleteGothram = async (id: number) => {
//     try {
//       await deleteGothram(id.toString());
//       notifyDelete('Successfully Deleted');
//       fetchGothrams(); // Refresh the list
//     } catch (error) {
//       console.error('Error deleting gothram:', error);
//     }
//   };

//   const handleDeleteConfirmation = (id: number) => {
//     setGothramToDelete(id);
//     setDeleteConfirmation(true);
//   };

//   const confirmDeleteGothram = async () => {
//     if (gothramToDelete !== null) {
//       await handleDeleteGothram(gothramToDelete);
//       setGothramToDelete(null);
//       setDeleteConfirmation(false);
//     }
//   };

//   const handleEditGothram = (gothram: Gothram) => {
//     setEditGothramId(gothram.id);
//     setNewGothram(gothram.name);
//     setShowPopup(true);
//   };

//   const clearValues = () => {
//     setEditGothramId(null);
//     setNewGothram('');
//     setShowPopup(false);
//   };

//   const columns: ColumnConfig<Gothram>[] = [
//     { field: 'id', headerName: 'ID', sortable: true },
//     { field:'gothram_name', headerName: 'Gothram Name', sortable: true },
//     { field:'rishi', headerName: 'Rishi Name', sortable: true },
//     { field:'sanketha_namam', headerName: 'Sanketha Namam', sortable: true },


//   ];

//   return (
//     <Container style={{ backgroundColor: 'white', padding: '20px', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}>
//       <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
//         <Reuse
//                   data={gothrams}
//                   columns={columns}
//                   handleEdit={handleEditGothram}
//                   handleDelete={handleDeleteConfirmation}
//                   setShowPopup={setShowPopup}
//                   idField="id"
//                   title="Gothrams" handleSearchChange={function (_query: string): void {
//                       throw new Error('Function not implemented.');
//                   } }        />
//         <TablePopUp
//                   setShowPopup={setShowPopup}
//                   showPopup={showPopup}
//                   clearValues={clearValues}
//                   handleAddOrUpdate={handleAddOrUpdateGothram}
//                   EditId={editGothramId}
//                   valueOne={newGothram}
//                   setValueOne={setNewGothram}
//                   labelOne="Gothram Name"
//                   addMsg="Add Gothram"
//                   editMsg="Edit Gothram"
//                   deleteConfirmation={deleteConfirmation}
//                   setDeleteConfirmation={setDeleteConfirmation}
//                   deletFun={confirmDeleteGothram}
//                   deletLabel="Are you sure you want to delete this gothram?" setValueTwo={function (value: string): void {
//                       throw new Error('Function not implemented.');
//                   } } setValueThree={function (_value: string): void {
//                       throw new Error('Function not implemented.');
//                   } } setValueFour={function (_value: string): void {
//                       throw new Error('Function not implemented.');
//                   } } valueFour={null} labelTwo={''} LabelThree={''} LabelFour={''}        />
//       </div>
//       <Notification />
//     </Container>
//   );
// };

// export default GothramTable;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';

import { GothramApi } from '../services/api'; // Adjust the API import
import Notification, { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';

interface Gothram {
  id: number;
  gothram_name: string;
  rishi: string;
  sanketha_namam: string;
  is_deleted: boolean;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const GothramList: React.FC = () => {
  const [gothrams, setGothrams] = useState<Gothram[]>([]);
  const [newGothramName, setNewGothramName] = useState<string | null>('');
  const [rishi, setRishi] = useState<string | null>('');
  const [sankethaNamam, setSankethaNamam] = useState<string | null>('');
  const [editGothramId, setEditGothramId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [gothramToDelete, setGothramToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchGothrams();
  }, []);

  const fetchGothrams = async () => {
    try {
      const response = await axios.get(GothramApi);
      setGothrams(response.data);
    } catch (error) {
      console.error('Error fetching gothrams:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${GothramApi}${id}/`);
      if (response.status >= 200 || response.status <= 201) {
        notifyDelete('Successfully Deleted');
        fetchGothrams();
      }
    } catch (error) {
      console.error('Error deleting gothram:', error);
    }
  };

  const handleDeleteGothram = (id: number) => {
    setGothramToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteGothram = async () => {
    if (gothramToDelete !== null) {
      await handleDelete(gothramToDelete);
      setGothramToDelete(null);
      setDeleteConfirmation(false);
      fetchGothrams();
    }
  };

  const addData = {
    gothram_name: newGothramName,
    rishi: rishi,
    sanketha_namam: sankethaNamam,
  };

  const handleAddOrUpdateGothram = async () => {
    if (!newGothramName?.trim() || !rishi?.trim() || !sankethaNamam?.trim()) {
      notifyDelete('Please submit all required fields');
      return;
    }

    try {
      let response;
      if (editGothramId) {
        response = await axios.put(`${GothramApi}${editGothramId}/`, addData);
        if (response.status === 200) {
          notify('Successfully updated');
        }
      } else {
        response = await axios.post(GothramApi, addData);
        if (response.status === 200||response.status === 201) {
          notify('Gothram Added Successfully');
        }
      }

      setNewGothramName('');
      setRishi('');
      setSankethaNamam('');
      setEditGothramId(null);
      setShowPopup(false);
      fetchGothrams();
    } catch (error) {
      console.error('Error adding/updating gothram:', error);
    }
  };

  const handleEditGothram = (gothram: Gothram) => {
    setEditGothramId(gothram.id);
    setNewGothramName(gothram.gothram_name);
    setRishi(gothram.rishi);
    setSankethaNamam(gothram.sanketha_namam);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditGothramId(null);
    setNewGothramName(null);
    setRishi(null);
    setSankethaNamam(null);
    setShowPopup(false);
  };

  const columns: ColumnConfig<Gothram>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'gothram_name', headerName: 'Gothram Name', sortable: true },
    { field: 'rishi', headerName: 'Rishi', sortable: true },
    { field: 'sanketha_namam', headerName: 'Sanketha Namam', sortable: true },
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
          data={gothrams}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditGothram}
          handleDelete={(id) => handleDeleteGothram(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Gothram List"
        />
        <TablePopUp
                  setShowPopup={setShowPopup}
                  showPopup={showPopup}
                  clearValues={clearValues}
                  handleAddOrUpdate={handleAddOrUpdateGothram}
                  EditId={editGothramId}
                  valueOne={newGothramName}
                  setValueOne={setNewGothramName}
                  valueTwo={rishi}
                  setValueTwo={setRishi}
                  valueThree={sankethaNamam}
                  setValueThree={setSankethaNamam}
                  labelOne="Gothram Name"
                  labelTwo="Rishi"
                  LabelThree="Sanketha Namam"
                  addMsg="Add Gothram"
                  editMsg="Edit Gothram"
                  deleteConfirmation={deleteConfirmation}
                  setDeleteConfirmation={setDeleteConfirmation}
                  deletFun={confirmDeleteGothram}
                  deletLabel="Are you sure you want to delete this gothram?" setValueFour={function (_value: string): void {
                      throw new Error('Function not implemented.');
                  } } valueFour={null} LabelFour={''}        />
      </div>
      <Notification />
    </Container>
  );
};

export default GothramList;

