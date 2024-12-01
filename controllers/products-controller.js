const Product = require('../models/product-model');

 async function getAllProduct(req, res, next) {
try {
    const products = await Product.findAll();
    res.render('customer/product/all-products', { products: products});
} catch (error)  {
   next(error);
}
   }

   async function getProductDetails(req, res, next) {
try {
   const product = await Product.findById(req.params.id);
   res.render('customer/product/product-detail', { product: product });
} catch (error) {
   next(error);
}


   }

   module.exports = {
      getAllProducts: getAllProduct,
      getProductDetails: getProductDetails,
   }