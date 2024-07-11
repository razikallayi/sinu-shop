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
import { toast } from 'react-toastify';
import { authHeader } from 'utils/auth';
import { AdminNavbar } from '../AdminNavbar';
export const Products = () => {
    const { isLoggedIn,logout } = useAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn()) navigate('/admin')
    }, [])

    const [products, setProducts] = useState()
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        axios.get("http://localhost:5000/product").then(response => {
            setProducts(response.data)
        })
    }
    const deleteProduct = (id) => {
        if(window.confirm("Are you sure want to delete?")){
            axios.delete("http://localhost:5000/product", { data: { id: id } , ...authHeader() },).then(response => {
                getProducts()
            }).catch(e=>{
                console.log(e);
                if(e.response?.data?.message == 'jwt expired'){
                    logout()
                }else{
                    toast(e.response.data.message)
                }
            })
        }
    }

    const editProduct = (id) => {
        navigate(`/product/${id}`)
    }

    return (
        <>
        <AdminNavbar/>
            <Grid container direction="row" justifyContent="center" sx={{ my: 4 }}>
                <Grid item><Typography variant='h5'>Products</Typography></Grid>
                <Grid item ><Button sx={{ mx: 4 }} variant='contained' onClick={() => navigate('/product/create')}>ADD</Button></Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products && products.map(product =>
                            <TableRow
                                key={product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{product.name}</TableCell>
                                <TableCell component="th" scope="row"><img height="50px" src={"http://localhost:5000/" + product.image} /></TableCell>
                                <TableCell component="th" scope="row">{product.description}</TableCell>
                                <TableCell component="th" scope="row">{product.price}</TableCell>
                                <TableCell component="th" scope="row">{product.type}</TableCell>
                                <TableCell component="th" scope="row">
                                    <Button variant='contained' color='warning' onClick={() => editProduct(product._id)}>Edit</Button>&nbsp;
                                    <Button color='error' variant='contained' onClick={() => deleteProduct(product._id)}>Delete</Button></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export const ProductItem = () => {
    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={productSample}
                alt="Live from space album cover"
            />
        </Card>
    )
}
