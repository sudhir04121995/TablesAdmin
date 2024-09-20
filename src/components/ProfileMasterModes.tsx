import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Notification, { notify, notifyDelete } from './TostNotification';
import TablePopUp from './TablePopUp';
import { getModes, addMode, updateMode, deleteMode } from '../services/api';
import Reuse from './Basic/Reuse';

interface Mode {
  mode: number;
  mode_name: string;
  is_deleted: boolean;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const ModesTable: React.FC = () => {
  const [modes, setModes] = useState<Mode[]>([]);
  const [newModeName, setNewModeName] = useState<string | null>('');
  const [editModeId, setEditModeId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [modeToDelete, setModeToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchModes();
  }, []);

  const fetchModes = async () => {
    try {
      const response = await getModes();
      setModes(response.data);
    } catch (error) {
      console.error('Error fetching modes:', error);
    }
  };

  const handleAddOrUpdateMode = async () => {
    try {
      if (editModeId) {
        await updateMode(editModeId.toString(), { mode_name: newModeName! });
        notify('Successfully updated');
      } else {
        if (newModeName) {
          await addMode({ mode_name: newModeName });
          notify('Mode Added Successfully');
        } else {
          notifyDelete('Please provide the mode name');
        }
      }
      setNewModeName('');
      setEditModeId(null);
      setShowPopup(false);
      fetchModes(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating mode:', error);
    }
  };

  const handleDeleteMode = async (id: number) => {
    try {
      await deleteMode(id.toString());
      notifyDelete('Successfully Deleted');
      fetchModes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting mode:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setModeToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (modeToDelete !== null) {
      await handleDeleteMode(modeToDelete);
      setModeToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: Mode) => {
    setEditModeId(value.mode);
    setNewModeName(value.mode_name);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditModeId(null);
    setNewModeName('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<Mode>[] = [
    { field: 'mode', headerName: 'ID', sortable: true },
    { field: 'mode_name', headerName: 'Mode Name', sortable: true },
    
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
                  data={modes}
                  columns={columns}
                  handleEdit={handleEditType}
                  handleDelete={(id) => handleDeleteType(Number(id))}
                  setShowPopup={setShowPopup}
                  idField="mode"
                  title="Mode" handleSearchChange={function (): void {
                      throw new Error('Function not implemented.');
                  } }        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateMode}
          EditId={editModeId}
          valueOne={newModeName}
          setValueOne={setNewModeName}
          valueTwo={null}
          setValueTwo={() => {}}
          labelOne="Mode Name"
          labelTwo=""
          addMsg="Add Mode"
          editMsg="Edit Mode"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this mode?"
          setValueThree={() => {}}
          valueThree={null}
          setValueFour={() => {}}
          valueFour={null}
          LabelThree=""
          LabelFour=""
        />
      </div>
      <Notification />
    </Container>
  );
};

export default ModesTable;
