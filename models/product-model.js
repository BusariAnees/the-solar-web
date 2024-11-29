const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image; // the image name
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assets/images/${productData.image}`;   //a custom path that you will use to request your path in your code
        if(productData._id) {
            this.id = productData._id.toString();
        }
    }

   static async findAll() {
   const products = await  db.getDb().collection('products').find().toArray();

   return products.map(function(productDoc) {
    return new Product(productDoc);
   });
   }

async save() {
    const productDocument = {
        title: this.title,
        summary: this.summary,
        price: this.price,
        description: this.description,
        image: this.image,
    };
   await  db.getDb().collection('products').insertOne(productDocument);
}
}


module.exports = Product;