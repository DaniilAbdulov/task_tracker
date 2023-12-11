import express from "express";
const router = express.Router();
import authRouter from "./authRouter.js";
import tasksRouter from "./tasksRouter.js";
import employeesRouter from "./employeesRouter.js";

router.use("/auth", authRouter);
router.use("/tasks", tasksRouter);
router.use("/employees", employeesRouter);

export default router;
