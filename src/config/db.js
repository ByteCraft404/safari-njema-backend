import mongoose from "mongoose";
const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      
    });
    console.log("Connected to DataBase");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
    throw new Error("Database connection failed: " + error.message);
  }
};
export default ConnectToDB;