"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(request, response, next) {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Separando o "Bearer" do token
    if (!token) {
        response.status(401).json({ message: "Token não fornecido" });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            response.status(403).json({ message: "Token inválido" });
            return;
        }
        else {
            next();
        }
    });
}
exports.default = authenticateToken;
