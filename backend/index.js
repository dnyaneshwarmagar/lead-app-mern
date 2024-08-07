const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
  }))

// Routes
const leadRoutes = require('./routes/leadRoutes');
app.use('/api', leadRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    try{
        console.log(`Server running on port ${PORT}`);
        connectDB();
    }catch(error){
        console.log('error: ', error);
    }
});



