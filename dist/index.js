"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const channel_1 = __importDefault(require("./api/channel"));
const video_1 = __importDefault(require("./api/video"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.get('/channels', channel_1.default.getAll);
app.get('/video', video_1.default.getOne);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server ready on port ${port}.`));
exports.default = app;
