import express from "express";
import teacherRouter from "./teacher.route.js";
import userRouter from "./user.route.js";
import teacherPositionRouter from "./teacherPosition.route.js";

const RootRouter = express.Router();

RootRouter.use("/teachers", teacherRouter);
RootRouter.use("/users", userRouter);
RootRouter.use("/teacher-positions", teacherPositionRouter);

export default RootRouter;
