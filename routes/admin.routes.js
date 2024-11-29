const express = require('express');
const adminController = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/image-uploads');


const router  = express.Router();

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

module.exports = router;