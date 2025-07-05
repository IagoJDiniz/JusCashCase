import { Request, Response } from "express";
import { makeRegisterPostsUseCase } from "@/use-cases/factories/make-register-posts-use-case";
import {
  makeGetFirstPostsUseCase,
  makeGetPostsUseCase,
} from "@/use-cases/factories/make-get-posts-use-case";
import { GetPostsUseCase } from "@/use-cases/get-posts";
import { z } from "zod";
import { makeUpdatePostUseCase } from "@/use-cases/factories/make-update-post-use-case";
import { PostNotFoundError } from "@/use-cases/errors/post-not-found";
import { InvalidPostTransitionError } from "@/use-cases/errors/invalid-post-transition-error";

export async function saveLastDayPosts(request: Request, response: Response) {
  //Salvando os posts do último dia

  const { posts } = request.body;

  try {
    //Criando o use case de forma externa para modularizar o uso de ORM's e repositórios
    const registerUseCase = makeRegisterPostsUseCase();
    await registerUseCase.execute({
      posts,
    });
  } catch (err) {
    console.log("erro no post:", err);
    throw err;
  }

  response.status(201).send({ message: "Posts cadastrados com sucesso!" });
}

export async function getFirstPosts(request: Request, response: Response) {
  try {
    const getFirstPostsUseCase = makeGetFirstPostsUseCase();
    const posts = await getFirstPostsUseCase.execute();
    response.status(200).send({ data: posts });
  } catch (err) {
    console.log("erro no getFirstPosts:", err);
    throw err;
  }
}

export async function updatePostState(request: Request, response: Response) {
  //Atualizando o estado do post

  const { status, id } = request.body;

  try {
    const updatePostUseCase = makeUpdatePostUseCase();
    const post = await updatePostUseCase.execute({ id, status });

    response.status(200).send({ data: post });
  } catch (err) {
    if (err instanceof PostNotFoundError) {
      response.status(404).json({ message: err.message }).send();
      return;
    }
    if (err instanceof InvalidPostTransitionError) {
      response.status(403).json({ message: err.message }).send();
      return;
    }
    throw err;
  }
}

export async function filterPosts(request: Request, response: Response) {
  //Buscando os posts

  const getPostsBodySchema = z.object({
    skip: z.coerce.number().optional().default(0),
    take: z.coerce.number().optional().default(30),
    startDate: z.coerce
      .date()
      .optional()
      .default(new Date("2024-10-01T00:00:00.000Z")),
    endDate: z.coerce
      .date()
      .optional()
      .default(new Date("2024-11-29T00:00:00.000Z")),
    textToSearch: z.string().optional(),
  });

  const { skip, take, startDate, endDate, textToSearch } =
    getPostsBodySchema.parse(request.query);

  try {
    const getPostsUseCase = makeGetPostsUseCase();
    const posts = await getPostsUseCase.execute({
      skip,
      take,
      startDate: startDate,
      endDate: endDate,
      textToSearch: textToSearch,
    });

    response.status(200).send({ data: posts });
  } catch (err) {
    throw err;
  }
}
