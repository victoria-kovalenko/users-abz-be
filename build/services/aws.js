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
exports.uploadImage = void 0;
const AWS = require('aws-sdk');
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
dotenv_1.default.config();
const uploadImage = (compressedImage) => __awaiter(void 0, void 0, void 0, function* () {
    // const config = {
    //   credentials: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    //   },
    //   region: process.env.AWS_REGION || '',
    // };
    const s3 = new AWS.S3();
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${(0, uuid_1.v4)()}.jpg`,
        Body: Buffer.from(compressedImage, 'base64'),
        ContentType: 'image/jpg',
        ACL: 'public-read'
    };
    const s3UploadResult = yield s3.upload(params).promise();
    return s3UploadResult.Location;
});
exports.uploadImage = uploadImage;
