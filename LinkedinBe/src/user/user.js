import express from "express";
import createHttpError from "http-errors";
import { JwtAuthenticate } from "../auth/jwt.js";
import { JWTAuthMiddleware } from "../auth/token.js";
import UserModel from "../user/schema.js";
const UserRouter = express.Router();
// 1
UserRouter.post("/new", async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = new UserModel(req.body);
    const { _id } = await newUser.save();
    res.send({ _id });
  } catch (error) {
    console.log(error);
  }
});
// 2
UserRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const user = await UserModel.find();
    res.send(user);
  } catch (error) {
    next(error);
  }
});
// 3
UserRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return next(
        createHttpError(404, `The user with ${req.params.id} is not found.`)
      );
    res.send(user);
  } catch (error) {
    next(error);
  }
});
// 4
UserRouter.get("/me", async (req, res, next) => {
  try {
    const userMe = await UserModel.findById(req.user._id);
    res.send(userMe);
  } catch (error) {
    console.log(error);
  }
});

// 5
UserRouter.delete("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    user
      ? res.send(user)
      : next(
          createHttpError(404, `The user with ${req.params.id} is not found.`)
        );
  } catch (error) {
    next(error);
  }
});
// 6
UserRouter.post("/login", async (req, res, next) => {
  try {
    const { firstName, password } = req.body;
    const user = await UserModel.checkCredentials(firstName, password);
    if (user) {
      const accessToken = await JwtAuthenticate(user);
      res.send({ accessToken });
    } else {
      next(createHttpError(401, "Credentials are not ok"));
    }
  } catch (error) {
    console.log(error);
  }
});
// 7
UserRouter.put("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user)
      return next(
        createHttpError(404, `The user with ${req.params.id} is not found.`)
      );
    res.send(user);
  } catch (error) {
    next(error);
  }
});

export default UserRouter;
