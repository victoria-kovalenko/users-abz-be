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
exports.imageCompressor = exports.imageResizer = void 0;
const tinify = require("tinify");
const sharp = require('sharp');
tinify.key = "7rLk7kLmY9JzpWhc1Zp43RVvk4XkrPGZ";
const imageResizer = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const resizedImage = yield sharp(path)
        .resize(70, 70, { fit: 'cover', position: 'center' })
        .toFormat('jpg')
        .toBuffer();
    return resizedImage;
});
exports.imageResizer = imageResizer;
const imageCompressor = (resizedImage) => {
    return tinify.fromBuffer(resizedImage).toBuffer().toString('base64');
};
exports.imageCompressor = imageCompressor;
