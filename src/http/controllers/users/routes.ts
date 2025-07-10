import { Router } from "express";

import { register } from "./register.controller";
import {
  authenticate,
  getMe,
  logout,
  refreshToken,
} from "./athentication.controller";

const router = Router();

router.post("/register", register);
router.post("/login", authenticate);
router.get("/refresh", refreshToken);
router.get("/me", getMe);
router.get("/logout", logout);

export default router;
