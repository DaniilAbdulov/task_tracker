import express from "express";
const router = express.Router();
import userRouter from "./userRouter.js";
// import productsRouter from "./productsRouter.js";

router.use("/user", userRouter);
// router.use("/product", productsRouter);

export default router;
