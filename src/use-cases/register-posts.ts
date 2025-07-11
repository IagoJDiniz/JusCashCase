import { PostsRepository } from "@/repositories/posts-repository";
import { Post } from "@/generated/prisma/client";
import { addHours, parse } from "date-fns";
import { RedisService } from "@/cache/redis/redis.service";
import { RedisCacheRepository } from "@/cache/redis/redis-cache-repository";

interface RegisterPostsUseCaseRequest {
  posts: {
    text: string;
    numero_processo: string;
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
    const redisService = new RedisService();
    const cache = new RedisCacheRepository(redisService);

    const registeredPosts: Post[] = [];
    for (const postData of posts) {
      const dataPublicacao = addHours(
        parse(postData.data_publicacao, "dd/MM/yyyy", new Date()),
        3
      );

      // Verifica se já existe um post com mesmo número de processo e data de publicação
      const existingPost = await this.postsRepository.findByNumeroEData(
        postData.numero_processo ?? "",
        dataPublicacao
      );

      if (existingPost) {
        continue; // já existe, pula para o próximo
      }

      const newPost = await this.postsRepository.create({
        text: postData.text,
        numero_processo: postData.numero_processo,
        autores: postData?.autores,
        advogados: postData?.advogados,
        valor_principal_bruto_liquido: postData.valor_principal_bruto_liquido,
        valor_juros_moratorios: postData.valor_juros_moratorios,
        honorarios_advocaticios: postData.honorarios_advocaticios,
        data_publicacao: addHours(
          parse(postData.data_publicacao, "dd/MM/yyyy", new Date()), //Lidando com o UTC-3, diferença deploy
          3
        ),
      });
      registeredPosts.push(newPost);
    }

    await cache.deleteValue("first-posts");

    return {
      posts: registeredPosts,
    };
  }
}
