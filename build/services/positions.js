"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPositions = void 0;
const db_1 = require("./db");
const getAllPositions = () => {
    return db_1.client.query(`
    SELECT * 
    FROM public."Positions"
  `);
};
exports.getAllPositions = getAllPositions;
