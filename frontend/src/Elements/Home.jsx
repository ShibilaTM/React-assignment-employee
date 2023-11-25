// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';
// import axiosInstance from '../axiosinterceptor';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [cardData, setCardData] = useState([]);
//   var [update, setUpdate] = useState(false);
//   var [singleValue, setSingleValue] = useState([]);
//   const navigate = useNavigate()
//   useEffect(() => {
//     axiosInstance.get('http://127.0.0.1:4000/form')
//       .then((res) => {
//         // Ensure that the fetched data is an array
//         if (Array.isArray(res.data)) {
//           setCardData(res.data);
//         } else {
//           console.error('Data is not an array:', res.data);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching form data:', error);
//       });
//   }, []);

//   const updateForm = (val) => {
//     console.log("update clicked", val);
  
//     // Check if the 'role' property is present in the val object
//     if ('role' in val) {
//       const userRole = val.role;
  
//       // Check if the user has the admin role before navigating
//       if (userRole === 'admin') {
//         setUpdate(true);
//         setSingleValue(val);
//         navigate('/form');
//       } else {
//         alert('Access denied. Only admin can update.');
//       }
//     } else {
//       console.error('Error: The "role" property is missing in the val object.', val);
//     }
//   };
  
//   return (
//     <div>
//       <Grid container spacing={2}>
//         {/* Check if cardData is an array before using map */}
//         {Array.isArray(cardData) && cardData.map((val, i) => (
//           <Grid item key={i} xs={12} sm={4} md={4}>
//             <Card sx={{ maxWidth: 345, margin: '40px', color: 'purple' }}>
//               <CardMedia
//                 sx={{ height: 150, width: 150, marginLeft: '100px' }}
//                 component="img"
//                 image="https://cdn4.vectorstock.com/i/1000x1000/94/23/businessman-avatar-cartoon-vector-17729423.jpg"
//                 title="Employee"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Name: {val.name}
//                 </Typography>
//                 <Typography gutterBottom variant="h6" component="div">
//                   Designation: {val.designation}
//                 </Typography>
//                 <Typography gutterBottom variant="h6" component="div">
//                   Location: {val.location}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" color="secondary" onClick={() => updateForm(val)}>
//                   Update
//                 </Button>
//                 <Button size="small" color="secondary">
//                   Delete
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();
//get data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const token = sessionStorage.getItem('userToken');
        const response = await axiosInstance.get('http://127.0.0.1:4000/form', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API Response:', response);
        setCardData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //delete
  const removeEmployee = (id) => {
    const token = sessionStorage.getItem('userToken'); // Replace with the actual token
  
    // Fetch the user role each time before making the delete request
    const storedUserRole = sessionStorage.getItem('userRole');
    console.log(storedUserRole);
  
    axiosInstance.delete(`http://127.0.0.1:4000/form/remove/${id}`, {
      headers: {
        'token': token
      }
    }).then((res) => {
      if (storedUserRole === 'admin') {
        alert(res.data);
        // Refresh or update your UI after a successful deletion
      } else if (storedUserRole === 'employee') {
        alert('You do not have permission to delete.');
      } else {
        console.log('not a user');
      }
    }).catch((error) => {
      console.error(error.response.data);
    });
  };
  
  
  


  return (
    <div>
      <Grid container spacing={2}>
        {cardData.map((val, i) => (
          <Grid item key={i} xs={12} sm={4} md={4}>
            <Card sx={{ maxWidth: 345, margin: '40px', color: 'purple' }}>
              <CardMedia
                sx={{ height: 150, width: 150, marginLeft: '100px' }}
                component="img"
                image="https://cdn4.vectorstock.com/i/1000x1000/94/23/businessman-avatar-cartoon-vector-17729423.jpg"
                title="Employee"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Name: {val.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Designation: {val.designation}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Location: {val.location}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="secondary">
                  Update
                </Button>
                <Button size="small" color="secondary" onClick={() => removeEmployee(val._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;


