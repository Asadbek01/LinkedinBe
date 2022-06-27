import jwt from "jsonwebtoken";

// Create user Interface
export const JwtAuthenticate = async (user) => {
  const accessToken = await generateToken({ _id: user._id });
  await user.save();
  return accessToken;
};
//   generate token
const generateToken = (payload) =>
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
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) rej(err);
      else res(payload);
    })
  );
