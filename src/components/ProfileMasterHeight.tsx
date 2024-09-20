import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Notification, { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import { getHeights, updateHeight, deleteHeight, addHeight } from '../services/api';

interface Height {
  id: number;
  height_desc: string;
  height_value: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const HeightTable: React.FC = () => {
  const [heights, setHeights] = useState<Height[]>([]);
  const [newHeightDesc, setNewHeightDesc] = useState<string | null>('');
  const [newHeightValue, setNewHeightValue] = useState<string | null>('');
  const [editHeightId, setEditHeightId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [heightToDelete, setHeightToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchHeights();
  }, []);

  const fetchHeights = async () => {
    try {
      const response = await getHeights();
      setHeights(
        response.data.map((item: { height_desc: string; height_value: string }) => ({
          id: parseInt(item.height_value, 10), // Use height_value as ID
          height_desc: item.height_desc,
          height_value: item.height_value,
        }))
      );
    } catch (error) {
      console.error('Error fetching heights:', error);
    }
  };

  const handleAddOrUpdateHeight = async () => {
    try {
      if (editHeightId) {
        await updateHeight(editHeightId.toString(), { height_desc: newHeightDesc!, height_value: newHeightValue! });
        notify('Successfully updated');
      } else {
        if (newHeightDesc && newHeightValue) {
          await addHeight({ height_desc: newHeightDesc, height_value: newHeightValue });
          notify('Height Added Successfully');
        } else {
          notifyDelete('Please submit all required fields');
        }
      }
      setNewHeightDesc('');
      setNewHeightValue('');
      setEditHeightId(null);
      setShowPopup(false);
      fetchHeights(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating height:', error);
    }
  };

  const handleDeleteHeight = async (id: number) => {
    try {
      await deleteHeight(id.toString());
      notifyDelete('Successfully Deleted');
      fetchHeights(); // Refresh the list
    } catch (error) {
      console.error('Error deleting height:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setHeightToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (heightToDelete !== null) {
      await handleDeleteHeight(heightToDelete);
      setHeightToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: Height) => {
    setEditHeightId(value.id);
    setNewHeightDesc(value.height_desc);
    setNewHeightValue(value.height_value);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditHeightId(null);
    setNewHeightDesc('');
    setNewHeightValue('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<Height>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'height_desc', headerName: 'Height Description', sortable: true },
    { field: 'height_value', headerName: 'Height Value', sortable: true },
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
          data={heights}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Height"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateHeight}
          EditId={editHeightId}
          valueOne={newHeightDesc}
          setValueOne={setNewHeightDesc}
          valueTwo={newHeightValue}
          setValueTwo={setNewHeightValue}
          labelOne="Height Description"
          labelTwo="Height Value"
          addMsg="Add Height"
          editMsg="Edit Height"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this height?"
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

export default HeightTable;
