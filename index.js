const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path:'config.env'});
const port = process.env.PORT || 4001;  
const morgan = require('morgan');
const mongoose = require('./server/database/connection')
const path = require('path')
const userRoutes = require('./server/routes/user')
const blogRoutes = require('./server/routes/blog')

app.use(express.json())
app.use(morgan('tiny'))

app.use('/',userRoutes)
app.use('/blog',blogRoutes)



app.get('/',(req,res)=>{
    res.status(200).json({'message':"success"})
})


app.listen(port,()=>{
    console.log(`running on port ${port}`)
})