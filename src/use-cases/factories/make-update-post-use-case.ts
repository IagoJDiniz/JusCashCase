import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { UpdatePostUseCase } from "../update-post";

export function makeUpdatePostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const updatePostUseCase = new UpdatePostUseCase(postsRepository);

  return updatePostUseCase;
}
