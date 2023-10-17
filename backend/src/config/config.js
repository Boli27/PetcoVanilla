require('dotenv').config();

module.exports={
    jwt:{
        secret: process.env.JET_SECRET || 'clavesecreta'
    }
}