

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { notify } from '../TostNotification';

// Define Zod schema
const schema = z.object({
  coupleName: z
    .string()
    .min(1, 'Couple name is required')
    .regex(/^[A-Za-z\s]+$/, 'Couple name must only contain letters and spaces'),
  dateOfMarriage: z.string().min(1, 'Date of marriage is required'),
  details: z.string().min(10, 'Details are required'),
});

type FormData = z.infer<typeof schema>;

const AddSuccessStory: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [buttonSubmit, setButtonSubmit] = useState('Submit');
  const navigate = useNavigate();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      coupleName: '',
      dateOfMarriage: '',
      details: '',
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]); // Handle photo state separately
    }
  };

  const onSubmit = async (data: FormData) => {
    setButtonSubmit('Adding....');
    const formData = new FormData();
    formData.append('couple_name', data.coupleName);
    if (photo) {
      formData.append('photo', photo);
    }
    formData.append('date_of_marriage', data.dateOfMarriage);
    formData.append('details', data.details);

    try {
      const response = await axios.post('http://192.168.1.5:8000/api/success_stories/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status >= 200 || response.status <= 299) {
        notify('Successfully Added');
      }
      if (response.status === 201) {
        navigate('/SuccessStories');
      }
    } catch (error) {
      console.error('Error adding success story:', error);
    }
  };

  return (
    <Paper style={{ padding: '80px', marginTop: '20px' }}>
      <h2 className="text-4xl font-bold mb-4 underline">Add Success Story</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="coupleName"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Couple Name"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.coupleName}
                  helperText={errors.coupleName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Upload Photo
              <input
                type="file"
                hidden
                onChange={handlePhotoChange}
              />
            </Button>
            {photo && (
              <div>
                <p>{photo.name}</p>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded"
                  style={{ marginTop: '10px', maxHeight: '200px', maxWidth: '100%' }}
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="dateOfMarriage"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Date of Marriage"
                  variant="outlined"
                  type="date"
                  fullWidth
                  {...field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.dateOfMarriage}
                  helperText={errors.dateOfMarriage?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="details"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Details"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  {...field}
                  error={!!errors.details}
                  helperText={errors.details?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" type="submit">
              {buttonSubmit}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddSuccessStory;

