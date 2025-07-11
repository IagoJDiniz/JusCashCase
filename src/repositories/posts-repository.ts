import { Prisma, Post, PostStatus } from "@/generated/prisma/client";

export interface PostsRepository {
  findById(id: string): Promise<Post | null>;
  findByPublishDate(publishDate: Date): Promise<Post[] | null>;
  find(
    userId: string,
    skip?: number,
    take?: number,
    startDate?: Date,
    endDate?: Date,
    textToSearch?: string
  ): Promise<Post[]>;
  create(data: Prisma.PostCreateInput): Promise<Post>;
  getFirstThirtyPosts(userId: string): Promise<Post[]>;
  update(id: string, userId: string, state: PostStatus): Promise<any>;
  findByNumeroEData(
    numero_processo: string,
    data_publicacao: Date
  ): Promise<Post | null>;
}
