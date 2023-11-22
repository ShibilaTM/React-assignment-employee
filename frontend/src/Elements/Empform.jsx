// import React, { useState } from 'react';
// import { Avatar, Box, Button, Container, CssBaseline, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
// import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import axiosInstance from '../axiosinterceptor';

// const defaultTheme = createTheme();

// const EmpForm = (props) => {
//   const [form, setForm] = useState({
//     name: props.data.name,
//     designation: props.data.designation,
//     salary: props.data.salary,
//     location: props.data.location,
//   });

//   const navigate = useNavigate();

//   const inputHandler = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const submitForm = (e) => {
//     if (props.method === 'PUT') {
//       axiosInstance.put(`http://127.0.0.1:4000/form/edit/${props.data._id}`, form)
//         .then((response) => {
//           if (response.data === 'Updated successfully') {
//             alert(response.data);
//             window.location.reload(false);
//             navigate('/home');
//           } else {
//             alert('Not updated');
//           }
//         })
//         .catch((error) => {
//           console.error('Error updating:', error);
//           alert('Error updating. Please try again.');
//         });
//     } else {
//       axiosInstance.post('http://127.0.0.1:4000/blogs/add', form)
//         .then((res) => {
//           alert(res.data);
//         })
//         .catch((error) => {
//           console.error('Error adding:', error);
//           alert('Error adding form. Please try again.');
//         });
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <GroupAddOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Employee Form
//           </Typography>
//           <Box component="form" noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Name"
//               name="name"
//               autoComplete="name"
//               value={form.name}
//               onChange={inputHandler}
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="designation"
//               label="Designation"
//               id="designation"
//               value={form.designation}
//               onChange={inputHandler}
//               autoComplete="designation"
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="salary"
//               label="Salary"
//               id="salary"
//               value={form.salary}
//               onChange={inputHandler}
//               autoComplete="current-password"
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="location"
//               label="Location"
//               id="location"
//               value={form.location}
//               onChange={inputHandler}
//               autoComplete="location"
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color='secondary'
//               sx={{ mt: 3, mb: 2 }}
//               onClick={submitForm}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default EmpForm;
import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';


const defaultTheme = createTheme();

const EmpForm = () => {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    salary: '',
    location: ''
  });
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user role after login
    axiosInstance.get('/get-user-role')  // Adjust the API endpoint based on your server implementation
      .then((res) => {
        setUserRole(res.data.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const inputHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addHandler = (e) => {
    e.preventDefault();

    if (userRole === 'admin') {
      axiosInstance.post('http://127.0.0.1:4000/form/add', form)  // Adjust the API endpoint based on your server implementation
        .then((res) => {
          alert(res.data);
          navigate('/home');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Unauthorized: Only admin can submit forms.');
    }
  };

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
            <GroupAddOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Employee Form
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
           <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Name"
              name="name"
              autoComplete="name"
              value={form.name}
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
              value={form.designation}
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
              value={form.salary}
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
              value={form.location}
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
  );
};

export default EmpForm;
