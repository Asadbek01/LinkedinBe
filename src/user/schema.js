import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserModel = new Schema(
  {
    firstName: { type: String, required: true },
    surename: { type: String, required: true },
    password: { type: Number, required: true },
  },
  { timestamps: true }
);
export default model("User", UserModel);
