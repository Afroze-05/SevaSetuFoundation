// config/db.js //for database 
// This file is responsible for establishing a connection to MongoDB using Mongoose.

const mongoose = require("mongoose");

/**
 * Connect to MongoDB using the connection string from environment variables.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 9+ uses modern defaults; options largely unnecessary but left
      // here as comments for clarity.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;


