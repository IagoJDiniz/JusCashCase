import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetPostsUseCase } from "../get-posts";

export function makeGetPostsUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const getPostsUseCase = new GetPostsUseCase(postsRepository);

  return getPostsUseCase;
}
