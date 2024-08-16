const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
require('dotenv').config();

connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
  }))

// Routes
const leadRoutes = require('./routes/leadRoutes');
const userModel = require('./models/User');
app.use('/api', leadRoutes);
app.get('/',async(req,res)=>{
    try{
        const users = await userModel.find();
        return res.status(200).send(users)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    try{
        console.log(`Server running on port ${PORT}`);
       
    }catch(error){
        console.log('error: ', error);
    }
});



