const AWS = require('aws-sdk');
import dotenv from 'dotenv';
import { v4 } from 'uuid';
dotenv.config();

export const uploadImage = async (compressedImage: string) => {
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
    Key: `${v4()}.jpg`,
    Body: Buffer.from(compressedImage, 'base64'),
    ContentType: 'image/jpg',
    ACL: 'public-read'
  };

  const s3UploadResult = await s3.upload(params).promise();
  return s3UploadResult.Location;
};