require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/menu',require('./routes/menu'));





mongoose.connection.once('open',()=>{
    console.log('connect to database');
    app.listen(PORT, ()=>{console.log(`server is running on port ${PORT}`)});
})