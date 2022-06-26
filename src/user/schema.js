import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcrypt";

const UserModel = new Schema(
  {
    firstName: { type: String, required: true },
    surename: { type: String, required: true },
    password: { type: Number, required: true },
  },
  { timestamps: true }
);

UserModel.pre("save", async function () {
  const newUser = this;
  const plainPW = newUser.password;
  if (newUser.isModified("password")) {
    const hash = await bcrypt.hash(plainPW, 12);
    newUser.password = hash;
  }
  next();
});
UserModel.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();
  delete userObject.password;
  delete userObject.__v;

  return userObject;
};
UserModel.statics.checkCredentials = async function (firstName, plainPw) {
  const user = await this.findOne({ firstName });

  if (user) {
    const isMatch = await bcrypt.compare(plainPw, user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
export default model("User", UserModel);
