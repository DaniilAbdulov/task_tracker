import express from "express";
const router = express.Router();
import authRouter from "./authRouter.js";
// import productsRouter from "./productsRouter.js";

router.use("/auth", authRouter);
// router.use("/product", productsRouter);

export default router;
