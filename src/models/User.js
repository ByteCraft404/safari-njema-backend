import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    name: { type: "string", required: [true] },
    email: { type: "string", required: [true] },
    password: { type: "string", required: [true] },
  },
  {
    versionKey: false,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;
