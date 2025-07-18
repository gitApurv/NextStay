import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let connected = false;
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (connected) {
    console.log("MongoDB is connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
