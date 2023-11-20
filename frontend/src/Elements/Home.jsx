import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';

const Home = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:4000/form').then((res) => {
      setCardData(res.data);
    });
  }, []);

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
                <Button size="small" color="secondary">
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
