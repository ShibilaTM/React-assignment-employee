import React,{useState} from 'react'
import { Avatar, Box, Button, Container, CssBaseline, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const defaultTheme = createTheme();
const EmpForm = () => {
  const [form,setForm] = useState({
    name:'', 
    designation:'',
    salary:'',
    location:''
  })
  const navigate = useNavigate()
  const inputHandler=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }
const addHandler = (e)=>{
  axios.post('http://127.0.0.1:4000/form/add',form)
  .then((res)=>{
    alert(res.data)
    navigate('/home')
  }).catch((error)=>{
        console.log(error)
    })
  
}

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <GroupAddOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Employee Form
        </Typography>
        <Box component="form"  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={inputHandler}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="designation"
            label="Designation"
            id="designation"
             onChange={inputHandler}
            autoComplete="designation"
          />
                <TextField
            margin="normal"
            required
            fullWidth
            name="salary"
            label="Salary"
            id="salary"
             onChange={inputHandler}
            autoComplete="current-password"
          />
               <TextField
            margin="normal"
            required
            fullWidth
            name="location"
            label="Location"
            id="location"
             onChange={inputHandler}
            autoComplete="location"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color='secondary'
            sx={{ mt: 3, mb: 2 }}
            onClick={addHandler}
          >
           Submit
          </Button>
        
        </Box>
      </Box>
      
    </Container>
  </ThemeProvider>
  )
}

export default EmpForm