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
exports.uploadUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = require("./db");
const getAllUsers = () => {
    return db_1.client.query(`
    SELECT * 
    FROM public."Users"
  `);
};
exports.getAllUsers = getAllUsers;
const getUserById = (userId) => {
    return db_1.client.query(`
    SELECT * 
    FROM public."Users"
    WHERE public."Users"."id" = '${userId}'
  `);
};
exports.getUserById = getUserById;
const uploadUser = (name, email, phone, position_id, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const nameFromForm = Array.isArray(name) ? name[0] : name;
    const emailFromForm = Array.isArray(email) ? email[0] : email;
    const phoneFromForm = Array.isArray(phone) ? phone[0] : phone;
    const positionFromForm = Array.isArray(position_id) ? +position_id[0] : +position_id;
    const data = yield (0, exports.getAllUsers)();
    let newId = 0;
    for (const row of data.rows) {
        if (row.id > newId) {
            newId = row.id;
        }
    }
    ;
    newId += 1;
    return db_1.client.query(`
    INSERT INTO public."Users"
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `, [newId, nameFromForm, emailFromForm, phoneFromForm, positionFromForm, imageUrl, new Date(), new Date()]);
});
exports.uploadUser = uploadUser;
