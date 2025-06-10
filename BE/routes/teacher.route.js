import express from "express";
import teacherController from "../controllers/teacher.controller.js";

const router = express.Router();

router.get("/", teacherController.getAll);
router.post("/", teacherController.create);
router.put("/:id", teacherController.update);

export default router;
