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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formidable_1 = __importDefault(require("formidable"));
const users_1 = require("../services/users");
const aws_1 = require("../services/aws");
const image_1 = require("../services/image");
const isValidData_1 = require("../helpers/isValidData");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, users_1.getAllUsers)();
    res.send(data.rows);
    res.end();
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const data = yield (0, users_1.getUserById)(+userId);
    res.send(data.rows);
    res.end();
});
const uploadNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = (0, formidable_1.default)({ multiples: true, maxFileSize: 5 * 1024 * 1024 });
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
        }
        const { name, email, phone, position_id } = fields;
        const { photo } = files;
        if ((0, isValidData_1.isValidData)(name, email, phone, position_id) !== 'all data valid') {
            console.error((0, isValidData_1.isValidData)(name, email, phone, position_id));
            res.status(422).send((0, isValidData_1.isValidData)(name, email, phone, position_id));
            res.end();
            return;
        }
        const photoFile = Array.isArray(photo) ? photo[0] : photo;
        const resizedImage = yield (0, image_1.imageResizer)(photoFile.filepath);
        const compressedImage = yield (0, image_1.imageCompressor)(resizedImage);
        const imageUrl = yield (0, aws_1.uploadImage)(compressedImage);
        (0, users_1.uploadUser)(name, email, phone, position_id, imageUrl)
            .then((result) => {
            const newUser = result.rows[0];
            res.send(`New user created with ID ${newUser.id}`);
            res.end();
        })
            .catch((err) => {
            console.error('Error creating new user:', err);
            res.status(500).send('Error creating new user');
            res.end();
        });
    }));
});
module.exports = {
    getAll, getById, uploadNewUser
};
