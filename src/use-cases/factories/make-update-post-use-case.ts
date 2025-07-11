import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { UpdatePostUseCase } from "../update-post";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeUpdatePostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const usersRepository = new PrismaUsersRepository();
  const updatePostUseCase = new UpdatePostUseCase(
    postsRepository,
    usersRepository
  );

  return updatePostUseCase;
}
