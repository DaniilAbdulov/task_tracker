import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = new Router();

router.post("/login", authController.login);
router.get("/", authMiddleware, authController.check);

export default router;
