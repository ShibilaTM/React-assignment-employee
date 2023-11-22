import { Box,AppBar,Toolbar, Typography, Button, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color='secondary'>
      <Toolbar>  
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         Employee Dashboard
        </Typography>
        <Button color="inherit"><Link to={'/home'} style={{color:'white',textDecoration:'none'}}>Home</Link></Button>
        <Button color="inherit"><Link to={'/form'} style={{color:'white',textDecoration:'none'}}>Form</Link></Button>
        <Button color="inherit"><Link to={'/logout'} style={{color:'white',textDecoration:'none'}}>Logout</Link></Button>
      </Toolbar>
    </AppBar>
  </Box>
  </Grid>
  )
}

export default Navbar