require('dotenv').config();
const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection successful ✅");
  } catch (error) {
    console.log("MongoDB connection error ❌", error);
  }
};

module.exports = connectdb;
