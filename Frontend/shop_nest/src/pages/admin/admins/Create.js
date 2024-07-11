import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FileUpload from 'components/FileUpload';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdmin } from 'hooks/useAdmin';


export const CreateAdmin = () => {
    const { isLoggedIn } = useAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn()) navigate('/admin')
    }, [])

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    const setAdmin = (admin) => {
        setName(admin.name)
        setEmail(admin.email)
        setPassword(admin.password)
    }


    const handleCreate = async () => {
        var form = new FormData();
        const data = { name: name, email: email, password: password }
        const response = await axios.post('http://localhost:5000/admin/create', data)
        if (response.data.success) {
            console.log(response.data);
            navigate(-1)
        } else {
            toast(response.data.message)
        }
    };

    const onNameChange = (e) => setName(e.target.value)
    const onEmailChange = (e) => setEmail(e.target.value)
    const onUserNameChange = (e) => setPassword(e.target.value)

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
            Create Admin
        </Typography>
        <TextField style={{ margin: "8px 0" }} fullWidth value={name} label="Name" onChange={onNameChange} />
        <TextField style={{ margin: "8px 0" }} fullWidth value={email} label="Email" onChange={onEmailChange} />
        <TextField style={{ margin: "8px 0" }} fullWidth value={password} type="password" label="Password" onChange={onUserNameChange} />
        <Button variant='contained' style={{ margin: "20px 0" }} onClick={handleCreate}>Create</Button>
        <Button variant='contained' style={{ margin: "0 20px" }} onClick={handleCancel}>Cancel</Button>
    </Box>
    )
}
