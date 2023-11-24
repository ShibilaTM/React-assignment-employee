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

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    designation: '',
    location: '',
  }); // Add state for update form data
  const navigate = useNavigate();

 
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
    

  const handleUpdate = async (id) => {
    try {
      const token = sessionStorage.getItem('userToken');
      const response = await axiosInstance.put(`http://127.0.0.1:4000/form/edit/${id}`, updateFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Update Response:', response);
      navigate('/form');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('userToken');
      const response = await axiosInstance.delete(`http://127.0.0.1:4000/form/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Delete Response:', response);
      // Update your state or fetch data again to reflect the changes
    } catch (error) {
      console.error('Error deleting data:', error);
    }
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
                <Button size="small" color="secondary" onClick={() => handleUpdate(val._id)}>
                  Update
                </Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(val._id)}>
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

