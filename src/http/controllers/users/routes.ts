import { Router } from "express";

import { register } from "./register.controller";
import { authenticate, getMe, refreshToken } from "./athentication.controller";

const router = Router();

router.post("/register", register);
router.post("/login", authenticate);
router.get("/refresh", refreshToken);
router.get("/me", getMe);

export default router;
