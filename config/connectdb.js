require("dotenv").config(); // Əlavə et əgər yoxdursa

const mongoose = require("mongoose");

const conncectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Environment-dən oxuyur
    console.log("Mongodb connection is successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conncectdb;
