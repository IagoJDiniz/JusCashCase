"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = void 0;
class UserAlreadyExistsError extends Error {
    constructor() {
        super("O e-mail já existe.");
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
