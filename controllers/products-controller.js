const Product = require('../models/product-model');

 async function getAllProduct(req, res, next) {
try {
    const products = await Product.findAll();
    res.render('customer/product/all-products', { products: products});
} catch (error)  {
   next(error);
}
   }

   module.exports = {
      getAllProducts: getAllProduct
   }