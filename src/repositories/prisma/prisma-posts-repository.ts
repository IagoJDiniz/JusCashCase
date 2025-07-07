import { prisma } from "@/lib/prisma";
import { Post, Prisma } from "@/generated/prisma/client";

import { PostsRepository } from "../posts-repository";
import { RedisService } from "@/cache/redis/redis.service";
import { RedisCacheRepository } from "@/cache/redis/redis-cache-repository";

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
      orderBy: {
        updated_at: "desc",
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

  async getFirstThirtyPosts(): Promise<Post[]> {
    const redisService = new RedisService();
    const cache = new RedisCacheRepository(redisService);

    const cacheHit = await cache.getValue("first-posts");
    if (cacheHit) {
      const cachedData = JSON.parse(cacheHit) as Post[];
      return cachedData;
    }

    const posts = await prisma.post.findMany({
      skip: 0,
      take: 30,
      orderBy: {
        updated_at: "desc",
      },
    });

    await cache.setValue("first-posts", JSON.stringify(posts));

    return posts;
  }

  async update(id: string, status: Post["status"]) {
    const redisService = new RedisService();
    const cache = new RedisCacheRepository(redisService);

    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    await cache.deleteValue("first-posts");

    return post;
  }
}
