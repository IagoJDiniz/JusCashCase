import { Router } from "express";

import {
  filterPosts,
  getFirstPosts,
  saveLastDayPosts,
  updatePostState,
} from "./posts.controller";
import { apiKeyAuth } from "@/http/middlewares/api-key-auth";
import authenticateToken from "@/http/middlewares/auth";

const router = Router();

router.post("/register-posts", apiKeyAuth, saveLastDayPosts);
router.get("/filter-posts", authenticateToken, filterPosts);
router.get("/posts", authenticateToken, getFirstPosts);
router.put("/update-post", authenticateToken, updatePostState);

export default router;
