import { Request, Response } from "express";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticationUseCase } from "@/use-cases/factories/make-authentication-use-case";
import jwt from "jsonwebtoken";
import { emailValidationSchema } from "@/use-cases/validations/user-zod-schemas";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "83710e013bc64c1bcb977d116bbde675cfc8fdc50d076587f26c3d56d6fcdaa7";

export async function authenticate(request: Request, response: Response) {
  const authenticateBodySchema = z.object({
    email: emailValidationSchema,
    password: z.string(),
  });

  try {
    const { email, password } = authenticateBodySchema.parse(request.body);

    const authenticateUseCase = makeAuthenticationUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = jwt.sign({ userName: user.name }, JWT_SECRET, {
      subject: user.id,
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userName: user.name }, JWT_SECRET, {
      subject: user.id,
      expiresIn: "7d",
    });

    response
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true, // Use true if using HTTPS
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      })
      .status(200)
      .json({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      response.status(400).json({ message: err.message });
    } else {
      throw err;
    }
  }
}
