const AWS = require('aws-sdk');
import dotenv from 'dotenv';
import { v4 } from 'uuid';
dotenv.config();

export const uploadImage = async (compressedImage: string) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${v4()}.jpg`,
    Body: Buffer.from(compressedImage, 'base64'),
    ContentEncoding: 'base64',
    ContentType: 'image/jpg',
    ACL: 'public-read'
  };

  const s3UploadResult = await s3.upload(params).promise();
  return s3UploadResult.Location;
};