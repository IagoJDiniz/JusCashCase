import { z } from "zod";
import { emailValidationRegex } from "@/utils/regex-list";

//***************************************************************** */
//Separando a validação de senha e email para unificar a lógica de validação
//mesmo que seja feita no front-end podemos precisar dela em um possível app
//***************************************************************** */

export const emailValidationSchema = z
  .string()
  .regex(
    emailValidationRegex,
    "O e-mail deve seguir o padrão 'xxx@xxx.com' e sem letras maiúsculas"
  );

export const passwordValidationSchema = z
  .string()
  .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  .regex(/[a-z]/, {
    message: "A senha deve conter ao menos uma letra minúscula",
  })
  .regex(/[A-Z]/, {
    message: "A senha deve conter ao menos uma letra maiúscula",
  })
  .regex(/[0-9]/, { message: "A senha deve conter ao menos um número" })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "A senha deve conter ao menos um caractere especial (!@#$...)",
  });
