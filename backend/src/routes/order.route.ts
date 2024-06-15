import { Router } from "express";
import { getOrders, createOrder } from "../controllers/order.controller";
import { auth } from "../middleware/jwt";

const router = Router();

router.get("/", auth, getOrders);
router.post("/create", auth, createOrder);

export default router;
