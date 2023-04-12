"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const { router: usersRouter } = require('./routes/users');
const { positionRouter: positionRouter } = require('./routes/positions');
const PORT = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(usersRouter);
app.use(positionRouter);
app.listen(process.env.PORT || PORT, () => {
    console.log(`API is ready on http://localhost:${PORT}`);
});
