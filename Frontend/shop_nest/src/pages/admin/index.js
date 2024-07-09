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
    const { user } = useAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/admin')
    }, [])

    return (
        <Container>
            <h1>Admin Dashboard</h1>
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
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {count} item(s)
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => handleView(link)}>view</Button>
            </CardActions>
        </>
    )
}