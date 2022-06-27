import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postsRouter from "./Posts/posts.js";
import profilesRouter from "./Profiles/profiles.js";
import experienceRouter from "./Profiles/experienece.js";
import jobsRouter from "./jobs/jobs.js";
import { errorHandlers } from "./middlewares/errorHandlers.js";
import searchRouter from "./search/search.js";
import expressListEndpoints from "express-list-endpoints";
import UserRouter from "./user/user.js";
import passport from "passport";
import googleStrategy from "./auth/oauth.js";
const server = express();
const PORT = process.env.PORT;

server.use(cors());
server.use(express.json());
passport.use("google", googleStrategy);

server.use("/posts", postsRouter);
server.use("/profiles", profilesRouter, experienceRouter);
server.use("/jobs", jobsRouter);
server.use("/search", searchRouter);
server.use("/user", UserRouter);

server.use(errorHandlers);

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("Connected  to mongo ");
});

server.listen(PORT, () => {
  console.log(`Server is  listening to ${PORT}`);
  console.table(expressListEndpoints(server));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
