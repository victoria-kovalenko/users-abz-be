"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidData = void 0;
const validator_1 = __importDefault(require("validator"));
const isValidData = (name, email, phone, position_id) => {
    const emailFromForm = Array.isArray(email) ? email[0] : email;
    const isValidName = name.length >= 2 && name.length <= 60;
    const isValidPhone = phone.length === 13 && phone.slice(0, 4) === '+380';
    const isValidEmail = validator_1.default.isEmail(emailFromForm);
    if (!position_id) {
        return 'You should choose a position';
    }
    if (!isValidName) {
        return 'Your name should be 2-60 characters';
    }
    if (!isValidPhone) {
        return 'Your phone should start with code of Ukraine +380 and be in total 13 characters';
    }
    if (!isValidEmail) {
        return 'Your email must be a valid according to RFC2822';
    }
    return 'all data valid';
};
exports.isValidData = isValidData;
