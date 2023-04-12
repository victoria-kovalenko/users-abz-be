const sharp = require('sharp');

export const imageResizer = async (path: string) => {
  const resizedImage = await sharp(path)
    .resize(70, 70, { fit: 'cover', position: 'center' })
    .jpeg()
    .toBuffer();
  
  return resizedImage;
};
