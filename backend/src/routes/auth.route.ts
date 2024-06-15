import { Router } from "express";
import { register, login, refreshToken } from "../controllers/auth.controller";
import { refreshTokenValidate } from "../middleware/jwt";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshTokenValidate, refreshToken)

export default router;
