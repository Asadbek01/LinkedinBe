import jwt from "jsonwebtoken";
import UserRouter from "../user/user";

// Create user Interface
const JwtAuthenticate = async (user) => {
  const accessToken = await generateToken(user._id);
  return accessToken;
};
//   generate token
const generateToken = (payload, _id) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) rej(err);
        else res(token);
      }
    )
  );
export const verifyToken = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, token) => {
      if (err) rej(err);
      else res(token);
    })
  );
