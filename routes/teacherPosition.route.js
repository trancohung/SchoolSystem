import express from "express";
import teacherPositionController from "../controllers/teacherPosition.controller.js";

const router = express.Router();

router.get("/", teacherPositionController.getAll);

export default router;
