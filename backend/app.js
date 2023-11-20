const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
const app = express(); 
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userRoute = require('./routes/userRoutes')
app.use('/user',userRoute)

const formRoute = require('./routes/formRoutes');
app.use('/form', formRoute);

app.use(morgan('dev'));
app.use(cors());


app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});
