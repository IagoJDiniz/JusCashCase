import { Request, Response } from "express";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticationUseCase } from "@/use-cases/factories/make-authentication-use-case";
import jwt from "jsonwebtoken";
import { emailValidationSchema } from "@/use-cases/validations/user-zod-schemas";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

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

    const accessToken = jwt.sign({ userName: user.name }, JWT_SECRET, {
      subject: user.id,
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userName: user.name }, JWT_REFRESH_SECRET, {
      subject: user.id,
      expiresIn: "7d",
    });

    response
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 1000 * 60 * 15,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

    response.status(200).json({ message: "Usuário autenticado!" });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      response.status(400).json({ message: err.message });
    } else {
      throw err;
    }
  }
}

export async function refreshToken(request: Request, response: Response) {
  const refreshToken = request.cookies.refreshToken;

  if (!refreshToken) {
    response.status(401).json({ message: "Refresh token ausente." });
    return;
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      sub: string;
      userName: string;
    };

    const newAccessToken = jwt.sign(
      { userName: payload.userName },
      JWT_SECRET,
      {
        subject: payload.sub,
        expiresIn: "15m",
      }
    );

    response.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 15,
    });

    response.status(200).json({ message: "Access token renovado" });
  } catch (err) {
    response.status(401).json({ message: "Refresh token inválido" });
  }
}

export async function getMe(request: Request, response: Response) {
  const token = request.cookies.accessToken;

  if (!token) {
    response.status(401).json({ message: "Não autenticado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userName: string;
    };

    response.status(200).json({
      name: decoded.userName,
    });
  } catch {
    response.status(401).json({ message: "Token inválido ou expirado" });
  }
}

export async function logout(request: Request, response: Response) {
  response.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  response.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  response.status(200).json({ message: "Logout realizado com sucesso" });
}
