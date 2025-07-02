"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
class RegisterUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ name, email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const password_hash = yield (0, bcryptjs_1.hash)(password, 6);
            const userWithSameEmail = yield this.usersRepository.findByEmail(email);
            // if (userWithSameEmail) {
            //   throw new UserAlreadyExistsError();
            // }
            const user = yield this.usersRepository.create({
                name,
                email,
                password_hash,
            });
            return {
                user,
            };
        });
    }
}
exports.RegisterUseCase = RegisterUseCase;
