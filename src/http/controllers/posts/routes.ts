import { Router } from "express";

import {
  filterPosts,
  getFirstPosts,
  saveLastDayPosts,
  updatePostState,
} from "./posts.controller";
import { apiKeyAuth } from "@/http/middlewares/api-key-auth";

const router = Router();

router.post("/register-posts", apiKeyAuth, saveLastDayPosts);
router.get("/filter-posts", filterPosts);
router.get("/posts", getFirstPosts);
router.put("/update-post", updatePostState);

export default router;
