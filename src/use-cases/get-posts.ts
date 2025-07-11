import { PostsRepository } from "@/repositories/posts-repository";
import { Post } from "@/generated/prisma/client";
import { parse, startOfDay } from "date-fns";

interface GetPostsUseCaseRequest {
  userId: string;
  skip?: number;
  take?: number;
  startDate?: Date;
  endDate?: Date;
  textToSearch?: string;
}

interface GetPostsUseCaseResponse {
  posts: Post[];
}

export class GetPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    userId,
    skip = 0,
    take = 30,
    startDate,
    endDate,
    textToSearch,
  }: GetPostsUseCaseRequest): Promise<GetPostsUseCaseResponse> {
    const posts = await this.postsRepository.find(
      userId,
      skip,
      take,
      startDate,
      endDate,
      textToSearch
    );

    return {
      posts,
    };
  }
}
