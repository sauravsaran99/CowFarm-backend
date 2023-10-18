const dotenv = require("dotenv");
const mongoose = require('mongoose');
// dotenv.config();

const mongoURI = `mongodb+srv://sauravsaran99:${process.env.PASSWORDMONGO}@cluster0.uwpr83k.mongodb.net/`; // Update with your MongoDB URI
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
