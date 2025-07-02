import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import {
  emailValidationSchema,
  passwordValidationSchema,
} from "@/use-cases/validations/user-zod-schemas";

export async function register(request: Request, response: Response) {
  //Validando utilizando schemas importados para unificar lógica de validação
  const registerBodySchema = z.object({
    name: z.string(),
    email: emailValidationSchema,
    password: passwordValidationSchema,
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    //Criando o use case de forma externa para modularizar o uso de ORM's e repositórios
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    //Tratativa de erro sendo feita dentro do controller, possível ponto de abstração
    if (err instanceof UserAlreadyExistsError) {
      response.status(409).json({ message: err.message }).send();
    } else {
      throw err;
    }
  }

  response.status(201).send({ message: "Usuário cadastrado com sucesso!" });
}
