const express = require('express');


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/menu',require('./routes/menu'));






app.listen(PORT, ()=>{console.log(`server is running on port ${PORT}`)});