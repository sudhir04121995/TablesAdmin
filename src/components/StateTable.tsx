// import React, { useEffect, useState } from 'react';
// import { 
//     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl 
// } from '@mui/material';
// import { getCountries, getStates, addState, updateState, deleteState } from '../services/api';

// const StateTable: React.FC = () => {
//     const [countries, setCountries] = useState<any[]>([]);
//     const [states, setStates] = useState<any[]>([]);
//     const [selectedCountry, setSelectedCountry] = useState<string>('');
//     const [open, setOpen] = useState(false);
//     const [currentState, setCurrentState] = useState<any>(null);

//     useEffect(() => {
//         fetchCountries();
//     }, []);

//     useEffect(() => {
//         if (selectedCountry) {
//             fetchStates(selectedCountry);
//         }
//     }, [selectedCountry]);

//     const fetchCountries = async () => {
//         try {
//             const response = await getCountries();
//             console.log('Fetched countries:', response.data); // Log to see fetched countries
//             setCountries(response.data);
//         } catch (error) {
//             console.error('Error fetching countries:', error);
//         }
//     };

//     const fetchStates = async (countryId: string) => {
//         try {
//             const response = await getStates(countryId);
//             console.log('Fetched states:', response.data); // Log to see fetched states
//             setStates(response.data);
//         } catch (error) {
//             console.error('Error fetching states:', error);
//         }
//     };

//     const handleOpen = (state: any = null) => {
//         setCurrentState(state || { name: '', country: selectedCountry });
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentState(null);
//     };

//     const handleSave = async () => {
//         try {
//             if (currentState.id) {
//                 await updateState(selectedCountry, currentState.id, currentState);
//             } else {
//                 await addState(selectedCountry, currentState);
//             }
//             fetchStates(selectedCountry);
//             handleClose();
//         } catch (error) {
//             console.error('Error saving state:', error);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             await deleteState(selectedCountry, id);
//             fetchStates(selectedCountry);
//         } catch (error) {
//             console.error('Error deleting state:', error);
//         }
//     };

//     const handleCountryChange = (countryId: string) => {
//         setSelectedCountry(countryId);
//     };

//     return (
//         <Paper>
//             <FormControl fullWidth>
//                 <InputLabel>Country</InputLabel>
//                 <Select
//                     value={selectedCountry}
//                     onChange={(e) => handleCountryChange(e.target.value as string)}
//                 >
//                     {countries.map((country) => (
//                         <MenuItem key={country.id} value={country.id}>
//                             {country.name}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//             <Button onClick={() => handleOpen()}>Add State</Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {states.map((state) => (
//                             <TableRow key={state.id}>
//                                 <TableCell>{state.id}</TableCell>
//                                 <TableCell>{state.name}</TableCell>
//                                 <TableCell>
//                                     <Button onClick={() => handleOpen(state)}>Edit</Button>
//                                     <Button onClick={() => handleDelete(state.id)}>Delete</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentState?.id ? 'Edit State' : 'Add State'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Name"
//                         value={currentState?.name || ''}
//                         onChange={(e) => setCurrentState({ ...currentState, name: e.target.value })}
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

// export default StateTable;


// import React, { useEffect, useState } from 'react';
// import { 
//     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl, CircularProgress 
// } from '@mui/material';
// import { getCountries, getStates, addState, updateState, deleteState } from '../services/api';

// interface Country {
//     id: string;
//     name: string;
// }

// interface State {
//     id: string;
//     name: string;
// }

// const StateTable: React.FC = () => {
//     const [countries, setCountries] = useState<Country[]>([]);
//     const [states, setStates] = useState<State[]>([]);
//     const [selectedCountry, setSelectedCountry] = useState<string>('');
//     const [open, setOpen] = useState(false);
//     const [currentState, setCurrentState] = useState<State | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         fetchCountries();
//     }, []);

//     useEffect(() => {
//         if (selectedCountry) {
//             fetchStates(selectedCountry);
//         }
//     }, [selectedCountry]);

//     const fetchCountries = async () => {
//         setLoading(true);
//         try {
//             const response = await getCountries();
//             setCountries(response.data);
//         } catch (error) {
//             setError('Error fetching countries');
//             console.error('Error fetching countries:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchStates = async (countryId: string) => {
//         setLoading(true);
//         try {
//             const response = await getStates(countryId);
//             setStates(response.data);
//         } catch (error) {
//             setError('Error fetching states');
//             console.error('Error fetching states:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // const handleOpen = (state: State | null = null) => {
//     //     setCurrentState(state || { name: '', id: '' });
//     //     setOpen(true);
//     // };
//     const handleOpen = (state: State | null = null) => {
//         setCurrentState(state || { name: '', id: '' }); // Ensure id is always a string
//         setOpen(true);
//     };
    
//     const handleClose = () => {
//         setOpen(false);
//         setCurrentState(null);
//     };

//     const handleSave = async () => {
//         try {
//             if (currentState) {
//                 if (currentState.id) {
//                     await updateState(selectedCountry, currentState.id, currentState);
//                 } else {
//                     await addState(selectedCountry, currentState);
//                 }
//                 fetchStates(selectedCountry);
//                 handleClose();
//             }
//         } catch (error) {
//             setError('Error saving state');
//             console.error('Error saving state:', error);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         if (window.confirm('Are you sure you want to delete this state?')) {
//             try {
//                 await deleteState(selectedCountry, id);
//                 fetchStates(selectedCountry);
//             } catch (error) {
//                 setError('Error deleting state');
//                 console.error('Error deleting state:', error);
//             }
//         }
//     };

//     const handleCountryChange = (countryId: string) => {
//         setSelectedCountry(countryId);
//     };

//     return (
//         <Paper>
//             <FormControl fullWidth>
//                 <InputLabel>Country</InputLabel>
//                 <Select
//                     value={selectedCountry}
//                     onChange={(e) => handleCountryChange(e.target.value as string)}
//                 >
//                     {countries.map((country) => (
//                         <MenuItem key={country.id} value={country.id}>
//                             {country.name}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//             <Button onClick={() => handleOpen()} disabled={!selectedCountry}>
//                 Add State
//             </Button>
//             {loading ? (
//                 <CircularProgress />
//             ) : (
//                 <TableContainer>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {states.map((state) => (
//                                 <TableRow key={state.id}>
//                                     <TableCell>{state.id}</TableCell>
//                                     <TableCell>{state.name}</TableCell>
//                                     <TableCell>
//                                         <Button onClick={() => handleOpen(state)}>Edit</Button>
//                                         <Button onClick={() => handleDelete(state.id)}>Delete</Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentState?.id ? 'Edit State' : 'Add State'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Name"
//                         value={currentState?.name || ''}
//                         onChange={(e) => setCurrentState({ ...currentState!, name: e.target.value })}

//                         fullWidth
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleSave} disabled={!currentState?.name.trim()}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </Paper>
//     );
// };

// export default StateTable;



// import React, { useEffect, useState } from 'react';
// import { 
//     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl, CircularProgress 
// } from '@mui/material';
// import { getCountries, getStates, addState, updateState, deleteState } from '../services/api';

// interface Country {
//     id: string;
//     name: string;
// }

// interface State {
//     id: string;
//     name: string;
// }

// const StateTable: React.FC = () => {
//     const [countries, setCountries] = useState<Country[]>([]);
//     const [states, setStates] = useState<State[]>([]);
//     const [selectedCountry, setSelectedCountry] = useState<string>('');
//     const [open, setOpen] = useState(false);
//     const [currentState, setCurrentState] = useState<State | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         fetchCountries();
//     }, []);

//     useEffect(() => {
//         if (selectedCountry) {
//             fetchStates(selectedCountry);
//         }
//     }, [selectedCountry]);

//     const fetchCountries = async () => {
//         setLoading(true);
//         try {
//             const response = await getCountries();
//             setCountries(response.data);
//         } catch (error) {
//             setError('Error fetching countries');
//             console.error('Error fetching countries:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchStates = async (countryId: string) => {
//         setLoading(true);
//         try {
//             const response = await getStates(countryId);
//             setStates(response.data);
//         } catch (error) {
//             setError('Error fetching states');
//             console.error('Error fetching states:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleOpen = (state: State | null = null) => {
//         setCurrentState(state || { name: '', id: '' }); // Ensure id is always a string
//         setOpen(true);
//     };
    
//     const handleClose = () => {
//         setOpen(false);
//         setCurrentState(null);
//     };

//     const handleSave = async () => {
//         try {
//             if (currentState) {
//                 if (currentState.id) {
//                     await updateState(selectedCountry, currentState.id, currentState);
//                 } else {
//                     await addState(selectedCountry, currentState);
//                 }
//                 fetchStates(selectedCountry);
//                 handleClose();
//             }
//         } catch (error) {
//             setError('Error saving state');
//             console.error('Error saving state:', error);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         if (window.confirm('Are you sure you want to delete this state?')) {
//             try {
//                 await deleteState(selectedCountry, id);
//                 fetchStates(selectedCountry);
//             } catch (error) {
//                 setError('Error deleting state');
//                 console.error('Error deleting state:', error);
//             }
//         }
//     };

//     const handleCountryChange = (countryId: string) => {
//         setSelectedCountry(countryId);
//     };

//     return (
//         <Paper>
//             <FormControl fullWidth>
//                 <InputLabel>Country</InputLabel>
//                 <Select
//                     value={selectedCountry}
//                     onChange={(e) => handleCountryChange(e.target.value as string)}
//                 >
//                     {countries.map((country) => (
//                         <MenuItem key={country.id} value={country.id}>
//                             {country.name}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//             <Button onClick={() => handleOpen()} disabled={!selectedCountry}>
//                 Add State
//             </Button>
//             {loading ? (
//                 <CircularProgress />
//             ) : (
//                 <TableContainer>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {states.map((state) => (
//                                 <TableRow key={state.id}>
//                                     <TableCell>{state.id}</TableCell>
//                                     <TableCell>{state.name}</TableCell>
//                                     <TableCell>
//                                         <Button onClick={() => handleOpen(state)}>Edit</Button>
//                                         <Button onClick={() => handleDelete(state.id)}>Delete</Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentState?.id ? 'Edit State' : 'Add State'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Name"
//                         value={currentState?.name || ''}
//                         onChange={(e) => setCurrentState({ ...currentState!, name: e.target.value })}
//                         fullWidth
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleSave} disabled={!currentState?.name.trim()}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </Paper>
//     );
// };

// export default StateTable;

import React, { useEffect, useState } from 'react';
import { 
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl, CircularProgress 
} from '@mui/material';
import { getCountries, getStates, addState, updateState, deleteState } from '../services/api';

interface Country {
    id: string;
    name: string;
}

interface State {
    id: string;
    name: string;
}

const StateTable: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [currentState, setCurrentState] = useState<State | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            fetchStates(selectedCountry);
        }
    }, [selectedCountry]);

    const fetchCountries = async () => {
        setLoading(true);
        try {
            const response = await getCountries();
            setCountries(response.data);
        } catch (error) {
            setError('Error fetching countries');
            console.error('Error fetching countries:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStates = async (countryId: string) => {
        setLoading(true);
        try {
            const response = await getStates(countryId);
            setStates(response.data);
        } catch (error) {
            setError('Error fetching states');
            console.error('Error fetching states:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = (state: State | null = null) => {
        setCurrentState(state || { name: '', id: '' }); // Ensure id is always a string
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setCurrentState(null);
    };

    const handleSave = async () => {
        try {
            if (currentState) {
                if (currentState.id) {
                    await updateState(selectedCountry, currentState.id, currentState);
                } else {
                    await addState(selectedCountry, currentState);
                }
                fetchStates(selectedCountry);
                handleClose();
            }
        } catch (error) {
            setError('Error saving state');
            console.error('Error saving state:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this state?')) {
            try {
                await deleteState(selectedCountry, id);
                fetchStates(selectedCountry);
            } catch (error) {
                setError('Error deleting state');
                console.error('Error deleting state:', error);
            }
        }
    };

    const handleCountryChange = (countryId: string) => {
        setSelectedCountry(countryId);
    };

    return (
        <Paper>
            <FormControl fullWidth>
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
            <Button onClick={() => handleOpen()} disabled={!selectedCountry}>
                Add State
            </Button>
            {loading ? (
                <CircularProgress />
            ) : (
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
                            {states.map((state) => (
                                <TableRow key={state.id}>
                                    <TableCell>{state.id}</TableCell>
                                    <TableCell>{state.name}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleOpen(state)}>Edit</Button>
                                        <Button onClick={() => handleDelete(state.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentState?.id ? 'Edit State' : 'Add State'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={currentState?.name || ''}
                        onChange={(e) => setCurrentState({ ...currentState!, name: e.target.value })}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} disabled={!currentState?.name.trim()}>Save</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default StateTable;
