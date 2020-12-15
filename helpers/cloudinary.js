//setting up our cloudinary account linking with multer upload files
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploads = async (file, folder) => {
  let uploadedImage = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
    folder: folder,
  });
  return { url: uploadedImage.url, id: uploadedImage.public_id };
};
