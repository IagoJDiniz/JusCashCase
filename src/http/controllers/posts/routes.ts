import { Router } from "express";

import { getPosts, saveLastDayPosts } from "./posts.controller";
import { apiKeyAuth } from "@/http/middlewares/api-key-auth";

const router = Router();

router.post("/register-posts", apiKeyAuth, saveLastDayPosts);
router.get("/posts", getPosts);

export default router;
