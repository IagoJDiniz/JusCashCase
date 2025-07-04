import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

import { PostsRepository } from "../posts-repository";
import { parse } from "date-fns";

export class PrismaPostsRepository implements PostsRepository {
  async findById(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  }

  async findByPublishDate(publishDate: Date) {
    const posts = await prisma.post.findMany({
      where: {
        data_publicacao: publishDate,
      },
    });

    return posts;
  }

  async find(
    skip: number,
    take: number,
    startDate: Date,
    endDate: Date,
    textToSearch?: string
  ) {
    const posts = await prisma.post.findMany({
      skip: skip,
      take: take,
      where: {
        data_publicacao: {
          gte: startDate,
          lte: endDate,
        },
        ...(textToSearch
          ? {
              text: {
                contains: textToSearch,
                mode: "insensitive",
              },
            }
          : {}),
      },
    });

    return posts;
  }

  async create(data: Prisma.PostCreateInput) {
    const post = await prisma.post.create({
      data,
    });

    return post;
  }
}
