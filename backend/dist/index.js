"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = require('./controller/auth');
const app = (0, express_1.default)();
app.use('/api', authRouter);
app.listen(3000, () => console.log('listening'));
