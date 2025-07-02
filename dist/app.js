"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_js_1 = __importDefault(require("./http/controllers/users/routes.js"));
const error_handler_js_1 = __importDefault(require("./http/middlewares/error-handler.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "50mb" }));
app.use(routes_js_1.default);
app.post("/teste", (req, res) => {
    const { data } = req.body;
    console.table(data);
    res.status(200).send();
});
app.use((0, cookie_parser_1.default)());
app.use(error_handler_js_1.default);
app.listen(process.env.PORT, () => `server running on port ${process.env.PORT}`);
