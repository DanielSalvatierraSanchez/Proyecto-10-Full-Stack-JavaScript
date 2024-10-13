const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const foldersOfStorage = (folderName) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: folderName,
            allowedFormats: ["jpg", "png", "jpeg", "gif", "webp", "avif"]
        }
    });
};

const uploadFolders = (folderName) => {
    const storage = foldersOfStorage(folderName);
    return multer({ storage });
};

moudule.exports = uploadFolders;
