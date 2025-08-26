import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
