import { Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAdmin } from 'hooks/useAdmin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
    const { user, isLoggedIn, logout } = useAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn()) navigate('/admin')
    }, [])

    return (
        <Container>
            <Grid container alignItems='center' spacing={8} justifyContent='center'>
                <Grid item><h1>Admin Dashboard</h1></Grid>
                <Grid item>
                <Grid direction='column' container alignItems='center' justifyContent='center'>
                    <Grid item><Typography variant='p'>{user.name}</Typography></Grid>
                    <Grid item><Button variant='outlined' color='error' onClick={logout}>Logout</Button></Grid>
                </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Card><Item name={"Products"} link={"/products"} count={10} /></Card>
                </Grid>


                <Grid item xs={3}>
                    <Card><Item name={"User"} link={"/users"} count={10} /></Card>
                </Grid>



                <Grid item xs={3}>
                    <Card><Item name={"Admin"} link={"/admins"} count={10} /></Card>
                </Grid>
            </Grid>
        </Container>
    )
}

const Item = ({ name, count, link }) => {
    const navigate = useNavigate()
    const handleView = () => {
        navigate(link)
    }
    return (
        <>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {name}
                </Typography>
                
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => handleView(link)}>view</Button>
            </CardActions>
        </>
    )
}