require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const { Plant } = require('./models/plant.js');

const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());
connectDB(); 

//Rutes
const plantRoutes = require('./routes/plants');
app.use('/api/plants', plantRoutes);

//Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
