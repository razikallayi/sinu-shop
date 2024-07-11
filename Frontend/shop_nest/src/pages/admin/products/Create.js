import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FileUpload from 'components/FileUpload';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authHeader, getToken } from 'utils/auth';
import { useAdmin } from 'hooks/useAdmin';


export const CreateProduct = () => {
    const { id } = useParams();

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [type, setType] = useState()
    const [image, setImage] = useState()
    const { isLoggedIn } = useAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn()) navigate('/admin')
    }, [])


    // const getProduct = (id) => {
    //     axios.post(`http://localhost:5000/search-product`, { _id: id }).then(response => {
    //         setProduct(response.data[0])
    //     })
    // }

    const setProduct = (product) => {
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setType(product.type)
        setImage(product.image)
    }


    const handleCreate = async () => {
        var form = new FormData();
        form.append('name', name)
        form.append('description', description)
        form.append('price', price)
        form.append('type', type)
        form.append('image', image)
        const response = await axios.post('http://localhost:5000/product', form,
            authHeader()
        )
        if (response.data.success) {
            navigate('/products')
        } else {
            toast(response.data.message)
        }
    };

    const onNameChange = (e) => setName(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onPriceChange = (e) => setPrice(e.target.value)
    const onTypeChange = (e) => setType(e.target.value)
    const onImageChange = (e) => {
        setImage(e.target.files[0])
    }
    const handleCancel = (e) => {
        navigate(-1)
    }


    return (<Box
        sx={{
            width: 500,
            margin: 'auto',
            marginY: '30px',
            maxWidth: '100%',
        }}
    >
        <Typography variant='h5'>
            Create Product
        </Typography>
        <TextField style={{ margin: "8px 0" }} fullWidth value={name} label="Name" onChange={onNameChange} />
        <TextField style={{ margin: "8px 0" }} fullWidth value={description} label="Description" onChange={onDescriptionChange} />
        <TextField style={{ margin: "8px 0" }} fullWidth value={price} label="Price" type='number' onChange={onPriceChange} />
        <FormControl style={{ margin: "8px 0" }} fullWidth>
            <InputLabel id="demo-simple-select-label" >Type</InputLabel>
            <Select label="Type" onChange={onTypeChange} value={type}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
            >
                <MenuItem value={'mens'}>Mens</MenuItem>
                <MenuItem value={'womens'}>Womens</MenuItem>
                <MenuItem value={'kids'}>kids</MenuItem>
            </Select>
        </FormControl>
        <FileUpload style={{ margin: "20px 0" }} onChange={onImageChange} />
        <br />
        <Button variant='contained' style={{ margin: "20px 0" }} onClick={handleCreate}>Create</Button>
        <Button variant='contained' style={{ margin: "0 20px" }} onClick={handleCancel}>Cancel</Button>
    </Box>
    )
}
