const multer = require('multer');
const uuid = require('uuid').v4;

const upload = multer({
    storage: multer.diskStorage({
        destination: 'product-data/images',
        filename: function(req, file, cb) {
            cb(null,uuid() + '-' + file.originalname );
        }
    })
});

// Middleware to handle multiple fields
const configuredMulterMiddleware = upload.fields([
  { name: 'image', maxCount: 1 }, // Single image for 'profileImage'
  { name: 'descriptionImage', maxCount: 1 },   // Single image for 'coverImage'
]);


module.exports = configuredMulterMiddleware;