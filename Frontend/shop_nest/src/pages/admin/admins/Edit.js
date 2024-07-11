import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useAdmin } from 'hooks/useAdmin';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authHeader } from 'utils/auth';


export const EditAdmin = () => {
    const { id } = useParams();

    const { isLoggedIn,logout } = useAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn()) navigate('/admin')
    }, [])

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        getAdmin(id)
    }, [])


    const getAdmin = (id) => {
        axios.post(`http://localhost:5000/get-admin`, { _id: id }).then(response => {
            setAdmin(response.data[0])
        }).catch(e=>{
            toast(e.response.message)
        })
    }

    const setAdmin = (admin) => {
        setName(admin.name)
        setEmail(admin.email)
    }


    const handleUpdate = () => {
        const data = {name:name, email:email, password:password}
        axios.patch(`http://localhost:5000/admin/${id}`, data, authHeader())
        .then(response=>{
            if (response.data.success) {
                navigate('/admins')
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
    const onEmailChange = (e) => setEmail(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)
    
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
        <label id="demo-simple-select-label" >Email</label>
        <input style={{ margin: "8px 0" }} value={email} label="Email" onChange={onEmailChange} />
        <br/>
        <label id="demo-simple-select-label" >Password</label>
        <input style={{ margin: "8px 0" }} value={password} label="Password" type='number' onChange={onPasswordChange} />
        <br/>
        <Button variant='contained' style={{ margin: "20px 0" }} onClick={handleUpdate}>Update</Button>
        <Button variant='contained' style={{ margin: "0 20px" }} onClick={handleCancel}>Cancel</Button>
    </Box>
    )
}
