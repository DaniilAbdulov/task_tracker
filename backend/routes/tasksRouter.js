import { Router } from "express";
import tasksController from "../controllers/tasksController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = new Router();

router.get("/getTasksList", tasksController.getTasksList);
router.get("/getTaskData", tasksController.getTaskData);
router.put("/changeTaskStatus", tasksController.changeTaskStatus);

export default router;
