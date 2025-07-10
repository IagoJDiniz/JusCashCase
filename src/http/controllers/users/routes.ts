import { Router, Request, Response } from "express";

import { register } from "./register.controller";
import { authenticate, refreshToken } from "./athentication.controller";

const router = Router();

router.post("/register", register);
router.post("/login", authenticate);
router.get("/refresh", refreshToken);

export default router;
