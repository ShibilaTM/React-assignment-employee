
// import {Button,  Grid,  TextField } from '@mui/material'
// import { Paper } from '@mui/material'
// import { Avatar } from '@mui/material'
// import LockPersonIcon from '@mui/icons-material/LockPerson';
// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axiosInstance from '../axiosinterceptor';


// const Login = () => {
//     const [user,setUser] = useState({
//     email:'',
//     password:''
//   })
// const inputHandler=(e)=>{
//       setUser({
//         ...user,
//         [e.target.name]:e.target.value
//       })
// }

// const navigate = useNavigate();


// const addHandler = async (e) => {
//   try {
//       const result = await axiosInstance.post('http://127.0.0.1:4000/user/login', user);

//       if (result.data.message === 'success') {
//           sessionStorage.setItem('userToken', result.data.token);
//           sessionStorage.setItem('userRole', result.data.payload.role); // Save user role
//           navigate('/home');
//       } else {
//           alert('Login failed');
//       }
//   } catch (err) {
//       console.error(err);
//   }
// };

    

//   const paperStyle ={padding:20,height:'70vh',width:300,margin:'20px auto'}
//   const avatarStyle = {backgroundColor:'#BF40BF'}
//   const buttonStyle ={margin:'15px 0'}
//   return (
//     <Grid>
//       <Paper  style={paperStyle}>
//         <Grid align="center">
//         <Avatar style={avatarStyle}><LockPersonIcon/></Avatar>
//               <h1 sx={{color:'purple'}}>Employee App Login</h1>
//         </Grid>
     
//     <br />
//   <TextField variant='outlined' label='Username/email' name='email' onChange={inputHandler} fullWidth/>
//     <br /><br />
//      <TextField variant='outlined' label='Password' name='password' type='password' onChange={inputHandler} fullWidth/>
//     <br /><br />
//    <Button variant='contained' color='secondary' style={buttonStyle} onClick={addHandler} fullWidth>Login</Button>
    
//    </Paper>
//     </Grid>
//       )
//     }
    
//     export default Login

import {Button,  Grid,  TextField } from '@mui/material'
import { Paper } from '@mui/material'
import { Avatar } from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosinterceptor';


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
      const result = await axiosInstance.post('http://127.0.0.1:4000/user/login', user);

      if (result.data.message === 'success') {
          sessionStorage.setItem('userToken', result.data.token);
          sessionStorage.setItem('userRole', result.data.payload.role); // Save user role
          navigate('/home');
      } else {
          alert('Login failed');
      }
  } catch (err) {
      console.error(err);
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



    // const addHandler = async (e) => {
    //   try {
    //     const result = await axiosInstance.post('http://127.0.0.1:4000/user/login', user);
    //     console.log('Result Data:', result.data);
    
    //     if (result.data.message === 'success') {
    //       // Extract payload from the result
    //       const { payload, token } = result.data;
    
    //       // Use payload to determine the role
    //       console.log('User Role:', payload.role);
    
    //       if (payload.role === 'employee' || payload.role === 'admin') {
    //         console.log('Navigating to /home');
    //         navigate('/home');
    //       }
    //     } else {
    //       // Handle login failure
    //       console.log('Login failed:', result.data);
    //     }
    //   } catch (err) {
    //     console.log('Error during login:', err);
    //     // Handle other errors if needed
    //   }
    // };