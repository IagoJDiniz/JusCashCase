import { Router } from "express";

import {
  filterPosts,
  getFirstPosts,
  saveLastDayPosts,
} from "./posts.controller";
import { apiKeyAuth } from "@/http/middlewares/api-key-auth";

const router = Router();

router.post("/register-posts", apiKeyAuth, saveLastDayPosts);
router.get("/filter-posts", filterPosts);
router.get("/posts", getFirstPosts);

export default router;
