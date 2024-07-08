import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    return (
        <Container>
            <h1>Admin Dashboard</h1>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Card><Item name={"Products"} link={"/products"} count={10} /></Card>
                </Grid>


                <Grid item xs={3}>
                    <Card><Item name={"User"} link={"/user"} count={10} /></Card>
                </Grid>



                <Grid item xs={3}>
                    <Card><Item name={"Admin"} link={"/admin"} count={10} /></Card>
                </Grid>
            </Grid>
        </Container>
    )
}

const Item = ({ name, count, link }) => {
    const navigate = useNavigate()
    const handleView=()=>{
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
                <Button size="small" onClick={()=>handleView(link)}>view</Button>
            </CardActions>
        </>
    )
}