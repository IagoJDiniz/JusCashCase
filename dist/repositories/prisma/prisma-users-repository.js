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
exports.PrismaUsersRepository = void 0;
const prisma_js_1 = require("@/lib/prisma.js");
class PrismaUsersRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_js_1.prisma.user.findUnique({
                where: {
                    id,
                },
            });
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_js_1.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            return user;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_js_1.prisma.user.create({
                data,
            });
            return user;
        });
    }
}
exports.PrismaUsersRepository = PrismaUsersRepository;
