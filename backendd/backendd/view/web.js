const express = require('express');
const multer = require('multer');
const path = require('path');
const { default: homeController } = require("./route/homeController");
var appRoot = require('app-root-path');
let router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });


const initWebRoute = (app) => {

    router.get('/upload', homeController.getUploadFilePage);
    router.post('/upload-profile-pic', upload.single('product_pic'), homeController.handleUploadFile)


    return app.use('/', router)
}

export default initWebRoute;
