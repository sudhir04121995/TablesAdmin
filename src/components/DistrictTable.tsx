
import React, { useEffect, useState } from 'react';
import { 
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl 
} from '@mui/material';
import { getCountries, getStates, getDistricts, addDistrict, updateDistrict, deleteDistrict } from '../services/api';

const DistrictTable: React.FC = () => {
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedState, setSelectedState] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [currentDistrict, setCurrentDistrict] = useState<any>({ name: '' });

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await getCountries();
            setCountries(response.data);
        } catch (error) {
            console.error('Failed to fetch countries', error);
        }
    };

    const fetchStates = async (countryId: string) => {
        try {
            const response = await getStates(countryId);
            setStates(response.data);
        } catch (error) {
            console.error('Failed to fetch states', error);
        }
    };

    const fetchDistricts = async (countryId: string, stateId: string) => {
        try {
            const response = await getDistricts(countryId, stateId);
            setDistricts(response.data);
        } catch (error) {
            console.error('Failed to fetch districts', error);
        }
    };

    const handleOpen = (district: any = { name: '' }) => {
        setCurrentDistrict(district);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentDistrict({ name: '' });
    };

    const handleSave = async () => {
        try {
            if (currentDistrict.id) {
                await updateDistrict(selectedCountry, selectedState, currentDistrict.id, currentDistrict);
            } else {
                await addDistrict(selectedCountry, selectedState, currentDistrict);
            }
            await fetchDistricts(selectedCountry, selectedState);
            handleClose();
        } catch (error) {
            console.error('Failed to save district', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDistrict(selectedCountry, selectedState, id);
            await fetchDistricts(selectedCountry, selectedState);
        } catch (error) {
            console.error('Failed to delete district', error);
        }
    };

    const handleCountryChange = (countryId: string) => {
        setSelectedCountry(countryId);
        setSelectedState('');
        setStates([]);
        setDistricts([]);
        fetchStates(countryId);
    };

    const handleStateChange = (stateId: string) => {
        setSelectedState(stateId);
        fetchDistricts(selectedCountry, stateId);
    };

    return (
        <Paper>
            <FormControl fullWidth margin="normal">
                <InputLabel>Country</InputLabel>
                <Select
                    value={selectedCountry}
                    onChange={(e) => handleCountryChange(e.target.value as string)}
                >
                    {countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                            {country.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>State</InputLabel>
                <Select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value as string)}
                >
                    {states.map((state) => (
                        <MenuItem key={state.id} value={state.id}>
                            {state.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginTop: '20px' }}>
                Add District
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {districts.map((district) => (
                            <TableRow key={district.id}>
                                <TableCell>{district.id}</TableCell>
                                <TableCell>{district.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpen(district)}>Edit</Button>
                                    <Button onClick={() => handleDelete(district.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentDistrict?.id ? 'Edit District' : 'Add District'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={currentDistrict.name}
                        onChange={(e) => setCurrentDistrict({ ...currentDistrict, name: e.target.value })}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default DistrictTable;
