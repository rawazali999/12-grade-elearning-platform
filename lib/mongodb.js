import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("new connection  to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
  console.log("MongoDB connection established");
};
