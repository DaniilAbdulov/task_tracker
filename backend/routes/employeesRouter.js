import { Router } from "express";
import employeesController from "../controllers/employeesController.js";
const router = new Router();

router.get("/getEmployeesList", employeesController.getEmployeesList);

export default router;
