import express from "express";
import createHttpError from "http-errors";
import UserModel from "../user/schema.js";
const UserRouter = express.Router();
// 1
UserRouter.post("/new", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});
// 2
UserRouter.get("/", async (req, res, next) => {
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
export default UserRouter;
