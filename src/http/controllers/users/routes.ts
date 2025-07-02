import { Router, Request, Response } from "express";

import { register } from "./register.controller.js";
import { authenticate } from "./athentication.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", authenticate);

export default router;
