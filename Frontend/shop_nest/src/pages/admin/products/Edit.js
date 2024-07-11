import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import FileUpload from 'components/FileUpload';
import { useAdmin } from 'hooks/useAdmin';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authHeader } from 'utils/auth';
import { imageUrl } from 'utils/image';


export const EditProduct = () => {
    const { id } = useParams();

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [type, setType] = useState()
    const [image, setImage] = useState()
    const { isLoggedIn,logout } = useAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn()) navigate('/admin')
    }, [])

    useEffect(() => {
        getProduct(id)
    }, [])


    const getProduct = (id) => {
        axios.post(`http://localhost:5000/search-product`, { _id: id }).then(response => {
            setProduct(response.data[0])
        }).catch(e=>{
            toast(e.response.message)
        })
    }

    const setProduct = (product) => {
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setType(product.type)
        setImage(product.image)
    }


    const handleUpdate = () => {
        var form = new FormData();
        form.append('name', name)
        form.append('description', description)
        form.append('price', price)
        form.append('type', type)
        form.append('image', image)
        axios.patch(`http://localhost:5000/product/${id}`, form,
            authHeader()
        ).then(response=>{

            if (response.data.success) {
                navigate('/products')
            } else {
                toast(response.data.message)
            }
        }).catch(e=>{
            if(e.response?.data?.message == 'jwt expired'){
                logout()
            }else{
                toast(e.response?.data?.message)
            }
        })
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
            Edit Product
        </Typography>
        <label id="demo-simple-select-label" >Name</label>
        <input style={{ margin: "8px 0" }} value={name} label="Name" onChange={onNameChange} />
        <br/>
        <label id="demo-simple-select-label" >Description</label>
        <input style={{ margin: "8px 0" }} value={description} label="Description" onChange={onDescriptionChange} />
        <br/>
        <label id="demo-simple-select-label" >Price</label>
        <input style={{ margin: "8px 0" }} value={price} label="Price" type='number' onChange={onPriceChange} />
        <br/>
            <label id="demo-simple-select-label" >Type</label>
            <select label="Type" onChange={onTypeChange} value={type}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
            >
                <option value={'mens'}>Mens</option>
                <option value={'womens'}>Womens</option>
                <option value={'kids'}>kids</option>
            </select>
            <br/>
            <br/>
            <img height="100px" src={imageUrl(image)}/>
            <br/>
        <FileUpload style={{ margin: "20px 0" }} onChange={onImageChange} />
        <br />
        <Button variant='contained' style={{ margin: "20px 0" }} onClick={handleUpdate}>Update</Button>
        <Button variant='contained' style={{ margin: "0 20px" }} onClick={handleCancel}>Cancel</Button>
    </Box>
    )
}
