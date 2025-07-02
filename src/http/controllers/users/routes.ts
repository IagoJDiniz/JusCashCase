import { Router, Request, Response } from "express";

import { register } from "./register.controller";
import { authenticate } from "./athentication.controller";
import authenticateToken from "/http/middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", authenticate);

export default router;
