import mongoose from "mongoose";
const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to DataBase");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export default ConnectToDB;
