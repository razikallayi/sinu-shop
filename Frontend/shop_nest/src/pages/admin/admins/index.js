import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useAdmin } from 'hooks/useAdmin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeader } from 'utils/auth';
import { AdminNavbar } from '../AdminNavbar';


export const Admins = () => {
    const { isLoggedIn, user } = useAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn()) navigate('/admin')
    }, [])

    const [admins, setAdmins] = useState()
    useEffect(() => {
        getAdmins()
    }, [])

    const getAdmins = () => {
        axios.get("http://localhost:5000/admins",
            authHeader()
        ).then(response => {
            setAdmins(response.data)
        })
    }
    const deleteAdmin = (id) => {
        axios.delete("http://localhost:5000/admin", { data: { id: id }, ...authHeader() }, ).then(response => {
            getAdmins()
        })
    }

    const editAdmin = (id) => {
        navigate(`/admin/${id}`)
    }

    return (
        <>
        <AdminNavbar/>
            <Grid container direction="row" justifyContent="center" sx={{ my: 4 }}>
                <Grid item><Typography variant='h5'>Admins</Typography></Grid>
                <Grid item ><Button sx={{ mx: 4 }} variant='contained' onClick={() => navigate('/admin/create')}>ADD</Button></Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins && admins.map(admin =>
                            <TableRow
                                key={admin._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{admin.name}</TableCell>
                                <TableCell component="th" scope="row">{admin.email}</TableCell>
                                <TableCell component="th" scope="row">
                                    <Button variant='contained' color='warning' onClick={() => editAdmin(admin._id)}>Edit</Button>&nbsp;
                                    {user.email != admin.email && <Button color='error' variant='contained' onClick={() => deleteAdmin(admin._id)}>Delete</Button>}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}