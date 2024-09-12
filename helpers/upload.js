const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: "docc9czgn",
    api_key: "546137187714789",
    api_secret: "cKpKMRBx0XZ3GbD461ukI1_6kw0"
});

const uploadFile = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "your_folder_name"  // Optional: add folder if you want to organize uploads
        });
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    uploadFile
};
