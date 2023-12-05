
// import React, { useState, useEffect } from 'react';
// import { Avatar, Box, Button, Container, CssBaseline, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
// import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosinterceptor';

// const defaultTheme = createTheme();

// const EmpForm = () => {
//   const [form, setForm] = useState({
//     name: '',
//     designation: '',
//     salary: '',
//     location: ''
//   });
//   const [userRole, setUserRole] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve user role from session storage
//     const storedUserRole = sessionStorage.getItem('userRole');

//     if (storedUserRole) {
//       setUserRole(storedUserRole);
//       setLoading(false);
//     } else {
//       setLoading(false);
//       console.error("User role not found in session storage");
//     }
//   }, []);

//   const inputHandler = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const addHandler = (e) => {
//     axiosInstance.post('http://127.0.0.1:4000/form/add', form)
//       .then((res) => {
//         alert(res.data.message);
//       })
//       .then(() => {
//         navigate('/home');
//       })
//       .catch((error) => {
//         console.error("Error adding form:", error);
//       });
//   }

//   // Render loading state or null if user role is not admin
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (userRole !== 'admin') {
//     console.log('userRole:', userRole);
//     // Redirect to home if the user is not an admin
//     navigate('/home');
//     return null; // Return null to avoid rendering the form
//   }
  

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
//            <TextField
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
//               onClick={addHandler}
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
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const locationState = useLocation().state;
  const selectedEmployee = locationState ? locationState.employee : null;

  useEffect(() => {
    // Retrieve user role from session storage
    const storedUserRole = sessionStorage.getItem('userRole');

    if (storedUserRole) {
      setUserRole(storedUserRole);

      // If a selected employee is available, update the form fields
      if (selectedEmployee) {
        setForm({
          name: selectedEmployee.name,
          designation: selectedEmployee.designation,
          salary: selectedEmployee.salary,
          location: selectedEmployee.location,
        });
      }

      setLoading(false);
    } else {
      setLoading(false);
      console.error("User role not found in session storage");
    }
  }, [selectedEmployee]);

  const inputHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateHandler = () => {
    
    
   
      if (!selectedEmployee) {
        console.error('No selected employee to update');
        return;
      }
    
      const token = sessionStorage.getItem('userToken');
    
      axiosInstance.put(`/edit/${selectedEmployee._id}`, selectedEmployee, {
        headers: { 'token': token },
      })
      .then((res) => {
        alert(res.data.message);
        navigate('/home');
      })
      .catch((error) => {
        console.error("Error updating form:", error);
      });
    };
    

  const addHandler = () => {
    axiosInstance.post('http://127.0.0.1:4000/form/add', form)
      .then((res) => {
        alert(res.data.message);
        navigate('/home');
      })
      .catch((error) => {
        console.error("Error adding form:", error);
      });
  };

  // Render loading state or null if the user role is not admin
  if (loading) {
    return <div>Loading...</div>;
  }

  if (userRole !== 'admin') {
    // Redirect to home if the user is not an admin
    navigate('/home');
    return null; // Return null to avoid rendering the form
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
  onClick={selectedEmployee ? updateHandler : addHandler}
>
  {selectedEmployee ? 'Update' : 'Submit'}
</Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EmpForm;
