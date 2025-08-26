import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

// tất cả endpoints dưới /api/tasks yêu cầu JWT
router.use(authRequired);

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
