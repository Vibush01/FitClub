const express = require('express');
     const mongoose = require('mongoose');
     const cors = require('cors');
     require('dotenv').config();

     const app = express();

     // Middleware
     app.use(cors());
     app.use(express.json());

     // MongoDB Connection
     mongoose.connect(process.env.MONGODB_URI)
       .then(() => console.log('MongoDB connected'))
       .catch(err => console.error('MongoDB connection error:', err));

     // Basic Route
     app.get('/', (req, res) => {
       res.send('Fitness Website Backend Running');
     });

     // Start Server
     const PORT = process.env.PORT || 5000;
     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));