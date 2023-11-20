
import {Button,  Grid,  TextField } from '@mui/material'
import { Paper } from '@mui/material'
import { Avatar } from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [user,setUser] = useState({
    email:'',
    password:''
  })
const inputHandler=(e)=>{
      setUser({
        ...user,
        [e.target.name]:e.target.value
      })
}

const navigate = useNavigate();

const addHandler = async (e) => {
  try {
    const result = await axios.post('http://localhost:4000/user/login', user,);

    if (result.data.status === 'success') {
      if (result.data.role === 'employee') {
        console.log(result.data.role);
        navigate('/home'); // Navigate to employee home
      } else if (result.data.role === 'admin') {
        navigate('/home'); // Navigate to admin home
      }
    } else {
      // Handle login failure
      console.log(result.data);
    }
  } catch (err) {
    console.log(err);
  }
};
  const paperStyle ={padding:20,height:'70vh',width:300,margin:'20px auto'}
  const avatarStyle = {backgroundColor:'#BF40BF'}
  const buttonStyle ={margin:'15px 0'}
  return (
    <Grid>
      <Paper  style={paperStyle}>
        <Grid align="center">
        <Avatar style={avatarStyle}><LockPersonIcon/></Avatar>
              <h1 sx={{color:'purple'}}>Employee App Login</h1>
        </Grid>
     
    <br />
  <TextField variant='outlined' label='Username/email' name='email' onChange={inputHandler} fullWidth/>
    <br /><br />
     <TextField variant='outlined' label='Password' name='password' type='password' onChange={inputHandler} fullWidth/>
    <br /><br />
   <Button variant='contained' color='secondary' style={buttonStyle} onClick={addHandler} fullWidth>Login</Button>
    
   </Paper>
    </Grid>
      )
    }
    
    export default Login