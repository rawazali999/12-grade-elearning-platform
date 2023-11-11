import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    //check if we have a connection to the database 
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
