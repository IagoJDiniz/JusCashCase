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
exports.register = void 0;
const zod_1 = require("zod");
const user_already_exists_error_1 = require("@/use-cases/errors/user-already-exists-error");
const make_register_use_case_1 = require("@/use-cases/factories/make-register-use-case");
function register(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const registerBodySchema = zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6),
        });
        const { name, email, password } = registerBodySchema.parse(request.body);
        try {
            const registerUseCase = (0, make_register_use_case_1.makeRegisterUseCase)();
            yield registerUseCase.execute({
                name,
                email,
                password,
            });
        }
        catch (err) {
            if (err instanceof user_already_exists_error_1.UserAlreadyExistsError) {
                response.status(409).send({ message: err.message });
            }
            throw err;
        }
        response.status(201).send();
    });
}
exports.register = register;
