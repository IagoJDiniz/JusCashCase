import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetPostsUseCase } from "../get-posts";
import { GetFirstPostsUseCase } from "../get-first-posts";

export function makeGetPostsUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const getPostsUseCase = new GetPostsUseCase(postsRepository);

  return getPostsUseCase;
}

export function makeGetFirstPostsUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const getFirstPostsUseCase = new GetFirstPostsUseCase(postsRepository);

  return getFirstPostsUseCase;
}
