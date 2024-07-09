const mongoose = require("mongoose");

async function connectToDB(url) {
  try {
    await mongoose.connect(url, {
      dbName: "Backend",
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

module.exports = connectToDB;
