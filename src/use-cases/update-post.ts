import { PostsRepository } from "@/repositories/posts-repository";
import { Post, PostStatus } from "@/generated/prisma/client";
import { PostNotFoundError } from "./errors/post-not-found";
import { InvalidPostTransitionError } from "./errors/invalid-post-transition-error";

interface UpdatePostUseCaseRequest {
  id: string;
  status: string;
}

interface UpdatePostUseCaseResponse {
  post: Post;
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}
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
    id,
    status,
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
    const newStatus = status as PostStatus;

    const currentPost = await this.postsRepository.findById(id);

    if (!currentPost) {
      throw new PostNotFoundError();
    }

    if (!this.isValidTransition(currentPost.status, newStatus)) {
      throw new InvalidPostTransitionError();
    }

    const post = await this.postsRepository.update(id, newStatus);

    return {
      post,
    };
  }
}
