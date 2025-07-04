import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { RegisterPostsUseCase } from "../register-posts";

export function makeRegisterPostsUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const registerPostsUseCase = new RegisterPostsUseCase(postsRepository);

  return registerPostsUseCase;
}
