const express = require('express');
const cors = require('cors')

const userRoutes=require('../routes/user.routes')
const petRoutes=require('../routes/pet.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/user', userRoutes);
app.use('/pet', petRoutes);

module.exports=app;