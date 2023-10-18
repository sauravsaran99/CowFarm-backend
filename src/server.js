const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/noteRoutes')
const connectDB = require('./config/connectDb');

const app = express();
app.use(cors({
    origin: ["http://localhost:3001"]
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', notesRoutes);
// app.use('/notes', noteRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Server is working!' });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
