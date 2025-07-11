import { PostsRepository } from "@/repositories/posts-repository";
import { Post, PostStatus } from "@/generated/prisma/client";
import { PostNotFoundError } from "./errors/post-not-found";
import { InvalidPostTransitionError } from "./errors/invalid-post-transition-error";
import { UsersRepository } from "@/repositories/users-repository";

interface UpdatePostUseCaseRequest {
  userId: string;
  id: string;
  status: string;
}

interface UpdatePostUseCaseResponse {
  post: Post;
}

export class UpdatePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository
  ) {}
  private isValidTransition(from: PostStatus, to: PostStatus): boolean {
    const invalidTransitions: [PostStatus, PostStatus][] = [
      ["READED", "NEW"],
      ["READED", "DONE"],
      ["DONE", "NEW"],
      ["DONE", "READED"],
      ["DONE", "SENT"],
      ["SENT", "NEW"],
      ["NEW", "SENT"],
      ["NEW", "DONE"],
    ];

    return !invalidTransitions.some(
      ([invalidFrom, invalidTo]) => from === invalidFrom && to === invalidTo
    );
  }

  async execute({
    userId,
    id,
    status,
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
    const newStatus = status as PostStatus;

    const currentPost = await this.postsRepository.findById(id);
    if (!currentPost) {
      throw new PostNotFoundError();
    }

    const userPostStatus = await this.usersRepository.findUserPostStatus(
      id,
      userId
    );
    const currentStatus = userPostStatus?.status ?? PostStatus.NEW;

    if (!this.isValidTransition(currentStatus, newStatus)) {
      throw new InvalidPostTransitionError();
    }

    const post = await this.postsRepository.update(id, userId, newStatus);

    return {
      post,
    };
  }
}
