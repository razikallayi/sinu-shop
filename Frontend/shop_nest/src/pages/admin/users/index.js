import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useAdmin } from 'hooks/useAdmin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeader } from 'utils/auth';
import { AdminNavbar } from '../AdminNavbar';
import { toast } from 'react-toastify';


export const Users = () => {
    const { isLoggedIn } = useAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn()) navigate('/admin')
    }, [])

    const [users, setUsers] = useState()
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        axios.get("http://localhost:5000/users",
            authHeader()
        ).then(response => {
            setUsers(response.data)
        })
    }

    const deleteUser = (id) => {
        if(window.confirm("Are you sure want to delete?")){
            axios.delete("http://localhost:5000/user", { data: { id: id } , ...authHeader() },).then(response => {
                getUsers()
            }).catch(e=>{
                toast(e.response.data.message)
            })
        }
    }

    return (
        <>
        <AdminNavbar/>
            <Grid container direction="row" justifyContent="center" sx={{ my: 4 }}>
                <Grid item><Typography variant='h5'>Users</Typography></Grid>
                {/* <Grid item ><Button sx={{ mx: 4 }} variant='contained' onClick={() => navigate('/user/create')}>ADD</Button></Grid> */}
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
                        {users && users.map(user =>
                            <TableRow
                                key={user._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{user.username}</TableCell>
                                <TableCell component="th" scope="row">{user.email}</TableCell>
                                <TableCell component="th" scope="row">
                                    <Button color='error' variant='contained' onClick={() => deleteUser(user._id)}>Delete</Button></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
