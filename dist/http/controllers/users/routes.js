"use strict";
Object.defineProperty(exports, "__esModule", { ue: true });
const express_1 = require("express");
const register_controller_js_1 = require("./register.controller");
const athentication_controller_js_1 = require("./athentication.controller");
const router = (0, express_1.Router)();
router.post("/register", register_controller_js_1.register);
router.post("/login", athentication_controller_js_1.authenticate);
exports.default = router;
