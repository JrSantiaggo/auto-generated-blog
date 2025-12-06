"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DEFAULT_PORT = void 0;
exports.DEFAULT_PORT = 3000;
exports.PORT = process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : exports.DEFAULT_PORT;
