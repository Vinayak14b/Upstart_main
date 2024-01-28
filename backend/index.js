const express = require('express');
const cors = require('cors');
const connectDB =  require('./config/db');
require('dotenv').config()

const app = express();
connectDB();
app.use(express.json())
app.use(cors());
const port = process.env.REACT_APP_PORT;

app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello welcome by Crawler Team...! "})
})
app.use('/api',require('./routes/route'));
app.listen(port,()=>{
    console.log(`server running  on  ${port}`);
})