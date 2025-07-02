export class UserAlreadyExistsError extends Error {
  constructor() {
    super("O e-mail já existe.");
  }
}
