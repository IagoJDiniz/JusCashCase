"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegisterUseCase = void 0;
const prisma_users_repository_js_1 = require("@/repositories/prisma/prisma-users-repository.js");
const register_js_1 = require("../register.js");
function makeRegisterUseCase() {
    const usersRepository = new prisma_users_repository_js_1.PrismaUsersRepository();
    const registerUseCase = new register_js_1.RegisterUseCase(usersRepository);
    return registerUseCase;
}
exports.makeRegisterUseCase = makeRegisterUseCase;
