import { Box, Button } from '@mui/material'
import { useAdmin } from 'hooks/useAdmin';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const pages = [
  { name: 'Dashboard', link: '/dashboard' },
  { name: 'Products', link: '/products' },
  { name: 'Users', link: '/users' },
  { name: 'Admins', link: '/admins' },
  { name: 'Logout', link: '/admin' },

];
export const AdminNavbar = () => {
  const navigate = useNavigate()
  const {logout} = useAdmin()
  const handleLinkClick = (page) => {
    if(page.name === 'Logout'){
      logout()
    }
    navigate(page.link);
  };
  return        <Box sx={{ flexGrow: 1}}>
  {pages.map((page) => (
    <Button
      key={page.name}
      onClick={() => handleLinkClick(page)}
      sx={{ my: 2 }}
    >
      {page.name}
    </Button>
  ))}
</Box>
}
