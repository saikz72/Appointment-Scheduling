"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//Login Route
router.post('/login', (req, res, next) => {
    res.send('Successfully logged in');
});
//Logout Route
router.post('/logout', (req, res, next) => { });
//Register Route
router.post('/register', (req, res, next) => { });
module.exports = router;
