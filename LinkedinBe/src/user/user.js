import express from "express";
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
  } catch (error) {
    next(error);
  }
});
// 3
UserRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
// 4
UserRouter.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
// 5
UserRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
export default UserRouter;
