import { prisma } from "@/lib/prisma";
import { Prisma, UserPostStatus } from "@/generated/prisma/client";

import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  findUserPostStatus(
    postId: string,
    userId: string
  ): Promise<UserPostStatus | null> {
    return prisma.userPostStatus.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }
}
