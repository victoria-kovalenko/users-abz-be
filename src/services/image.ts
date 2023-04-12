const tinify = require("tinify");
const sharp = require('sharp');
tinify.key = "7rLk7kLmY9JzpWhc1Zp43RVvk4XkrPGZ";

export const imageResizer = async (path: string) => {
  const resizedImage = await sharp(path)
    .resize(70, 70, { fit: 'cover', position: 'center' })
    .toFormat('jpg')
    .toBuffer();
  
  return resizedImage;
};

export const imageCompressor = (resizedImage: Buffer) => {
  return tinify.fromBuffer(resizedImage).toBuffer().toString('base64')
}