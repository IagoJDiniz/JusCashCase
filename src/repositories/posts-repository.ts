import { Prisma, Post, PostStatus } from "@/generated/prisma/client";

export interface PostsRepository {
  findById(id: string): Promise<Post | null>;
  findByPublishDate(publishDate: Date): Promise<Post[] | null>;
  find(
    skip?: number,
    take?: number,
    startDate?: Date,
    endDate?: Date,
    textToSearch?: string
  ): Promise<Post[]>;
  create(data: Prisma.PostCreateInput): Promise<Post>;
  getFirstThirtyPosts(): Promise<Post[]>;
  update(id: string, state: PostStatus): Promise<Post>;
}
