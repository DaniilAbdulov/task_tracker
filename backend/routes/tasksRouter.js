import { Router } from "express";
import tasksController from "../controllers/tasksController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = new Router();

router.get("/getTasksList", authMiddleware, tasksController.getTasksList);
router.get("/getTaskData", tasksController.getTaskData);
router.put("/changeTaskStatus", tasksController.changeTaskStatus);
router.post("/createNewTask", tasksController.createNewTask);
router.put("/changeTask", tasksController.changeTask);

export default router;
