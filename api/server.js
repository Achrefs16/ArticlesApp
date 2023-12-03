const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app =express();
const {mongoose} =require('mongoose')
const cookieParser =require('cookie-parser')
const multer =require('multer');
const path = require('path')
// data base connection
 mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log('database connected'))
 .catch((err)=> console.log('database not connected',err))


// middleware


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/uploads',express.static(__dirname+'/uploads'))


app.use('/', require('./routes/authRoutes'))
const Port =5001;
app.listen(Port, ()=>console.log(`listen server on port ${Port}`))