export class InvalidPostTransitionError extends Error {
  constructor() {
    super("Não é permitido mover o post para esse status.");
  }
}
