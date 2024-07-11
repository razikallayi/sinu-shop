import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import productSample from "assets/product_0.jpg";
import axios from 'axios';
import { useAdmin } from 'hooks/useAdmin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeader, getToken } from 'utils/auth';
import { AdminNavbar } from '../AdminNavbar';


export const Admins = () => {
    const { user } = useAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/admin')
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
    const deleteProduct = (id) => {
        axios.delete("http://localhost:5000/admin", authHeader(), { data: { id: id } }, ).then(response => {
            getAdmins()
        })
    }

    const editProduct = (id) => {
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
                                    <Button variant='contained' color='warning' onClick={() => editProduct(admin._id)}>Edit</Button>&nbsp;
                                    <Button color='error' variant='contained' onClick={() => deleteProduct(admin._id)}>Delete</Button></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

// export const ProductItem = () => {
//     return (
//         <Card sx={{ display: 'flex' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                 <CardContent sx={{ flex: '1 0 auto' }}>
//                     <Typography component="div" variant="h5">
//                         Live From Space
//                     </Typography>
//                     <Typography variant="subtitle1" color="text.secondary" component="div">
//                         Mac Miller
//                     </Typography>
//                 </CardContent>
//                 <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

//                 </Box>
//             </Box>
//             <CardMedia
//                 component="img"
//                 sx={{ width: 151 }}
//                 image={productSample}
//                 alt="Live from space album cover"
//             />
//         </Card>
//     )
// }
