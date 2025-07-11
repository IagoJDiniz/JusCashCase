import { prisma } from "@/lib/prisma";
import { Post, Prisma, PostStatus } from "@/generated/prisma/client";

import { PostsRepository } from "../posts-repository";
import { RedisService } from "@/cache/redis/redis.service";
import { RedisCacheRepository } from "@/cache/redis/redis-cache-repository";

interface PostWithStatus extends Post {
  status: string;
  updated_at: Date;
}

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
    userId: string,
    skip: number,
    take: number,
    startDate: Date,
    endDate: Date,
    textToSearch?: string
  ) {
    // Base da query
    let baseQuery = `
    SELECT 
      p.*,
      COALESCE(ups.status, 'NEW') AS status,
      COALESCE(ups."updatedAt", p."created_at") AS updated_at
    FROM posts p
    LEFT JOIN "user-post-status" ups
      ON ups."postId" = p.id AND ups."userId" = $1
    WHERE p."data_publicacao" BETWEEN $2 AND $3
  `;

    const params: any[] = [userId, startDate, endDate];
    let paramIndex = 4; // próximo índice para parâmetros SQL

    if (textToSearch && textToSearch.trim() !== "") {
      baseQuery += ` AND p.text ILIKE $${paramIndex}`;
      params.push(`%${textToSearch}%`);
      paramIndex++;
    }

    baseQuery += `
    ORDER BY updated_at DESC
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `;

    params.push(take, skip);

    const posts = await prisma.$queryRawUnsafe<PostWithStatus[]>(
      baseQuery,
      ...params
    );

    return posts;
  }

  async create(data: Prisma.PostCreateInput) {
    const post = await prisma.post.create({
      data,
    });

    return post;
  }

  async getFirstThirtyPosts(userId: string): Promise<Post[]> {
    const redisService = new RedisService();
    const cache = new RedisCacheRepository(redisService);
    const cacheKey = `first-posts:${userId}`;

    const cacheHit = await cache.getValue(cacheKey);
    if (cacheHit) {
      return JSON.parse(cacheHit) as PostWithStatus[];
    }

    const posts = await prisma.$queryRawUnsafe<PostWithStatus[]>(
      `
    SELECT 
      p.*,
      COALESCE(ups.status, 'NEW') AS status,
      COALESCE(ups."updatedAt", p."created_at") AS updated_at
    FROM posts p
    LEFT JOIN "user-post-status" ups
      ON ups."postId" = p.id AND ups."userId" = $1
    ORDER BY updated_at DESC
    LIMIT 30
    `,
      userId
    );

    await cache.setValue(cacheKey, JSON.stringify(posts));

    return posts;
  }

  async update(id: string, userId: string, status: PostStatus) {
    const redisService = new RedisService();
    const cache = new RedisCacheRepository(redisService);
    const cacheKey = `first-posts:${userId}`;

    // Verificando se existe a relação desse post com o usuário atual
    const existing = await prisma.userPostStatus.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: id,
        },
      },
    });

    if (existing) {
      //Se existir a relação
      // Atualiza o status
      await prisma.userPostStatus.update({
        where: {
          userId_postId: {
            userId,
            postId: id,
          },
        },
        data: {
          status,
        },
      });
    } else {
      //Caso contrário
      // Cria a relação
      await prisma.userPostStatus.create({
        data: {
          userId,
          postId: id,
          status,
        },
      });
    }

    await cache.deleteValue(cacheKey);

    return { id, userId, status };
  }

  async findByNumeroEData(numero_processo: string, data_publicacao: Date) {
    return prisma.post.findFirst({
      where: {
        numero_processo,
        data_publicacao,
      },
    });
  }
}
