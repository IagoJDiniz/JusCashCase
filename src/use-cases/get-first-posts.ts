import { PostsRepository } from "@/repositories/posts-repository";
import { Post } from "@/generated/prisma/client";

interface GetFirstPostsUseCaseResponse {
  posts: Post[];
}

export class GetFirstPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(userId: string): Promise<GetFirstPostsUseCaseResponse> {
    const posts = await this.postsRepository.getFirstThirtyPosts(userId);

    return {
      posts,
    };
  }
}
