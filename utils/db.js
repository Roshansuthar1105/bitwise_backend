import mongoose from "mongoose";
// const URI = "mongodb://127.0.0.1:27017/practice_mern";
// const URI = "mongodb://127.0.0.1:27017/practice_mern";
import dotenv from 'dotenv'
dotenv.config();
const URI = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("Error during connecting to mongo db");
    console.error(error);
  }
};
export default connectDB;
