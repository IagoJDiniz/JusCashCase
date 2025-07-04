import { PostsRepository } from "@/repositories/posts-repository";
import { Post } from "@/generated/prisma/client";
import { parse, startOfDay } from "date-fns";

interface RegisterPostsUseCaseRequest {
  posts: {
    text: string;
    numero_processo?: string;
    autores: string[];
    advogados: string[];
    valor_principal_bruto_liquido?: string;
    valor_juros_moratorios?: string;
    honorarios_advocaticios?: string;
    data_publicacao: string;
  }[];
}

interface RegisterPostsUseCaseResponse {
  posts: Post[];
}

export class RegisterPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    posts,
  }: RegisterPostsUseCaseRequest): Promise<RegisterPostsUseCaseResponse> {
    const registeredPosts: Post[] = [];
    for (const postData of posts) {
      const newPost = await this.postsRepository.create({
        text: postData.text,
        numero_processo: postData.numero_processo,
        autores: postData?.autores,
        advogados: postData?.advogados,
        valor_principal_bruto_liquido: postData.valor_principal_bruto_liquido,
        valor_juros_moratorios: postData.valor_juros_moratorios,
        honorarios_advocaticios: postData.honorarios_advocaticios,
        data_publicacao: startOfDay(
          parse(postData.data_publicacao, "dd/MM/yyyy", new Date())
        ),
      });
      registeredPosts.push(newPost);
    }

    return {
      posts: registeredPosts,
    };
  }
}
