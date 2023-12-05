const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
const app = express(); 
const PORT = process.env.PORT;

const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userRoute = require('./routes/userRoutes')
app.use('/user',userRoute)

const formRoute = require('./routes/formRoutes');
app.use('/form', formRoute);

//serving the frontend
app.use(express.static(path.join(__dirname,'./frontend/build')))

app.get('*',function(_,res){
    res.sendFile(
        path.join(__dirname,'./frontend/build/index.html'),
        function(err){
            res.status(500).send(err)
        }
    )
})


app.use(morgan('dev'));
app.use(cors());


app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});
