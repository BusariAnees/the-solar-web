const db = require('../data/database');
const mongodb = require('mongodb');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image; // the image name
        // this.descriptionImage = productData.descriptionImage
        this.updateImageData() //a custom path that you will use to request your path in your code
        if(productData._id) {
            this.id = productData._id.toString();
        }
    }

static async findById(productId){
    let prodId;
    try {
     prodId = new mongodb.ObjectId(productId);
    } catch (error) {
         error.code = 404;
        throw error;
    }

   const product = await  db.getDb().collection('products').findOne({_id: prodId});
   if(!product){
    const error = new Error('could not find product with provided id.');
    error.code = 404;
    throw error;
   }
   return new Product(product);
}

   static async findAll() {
   const products = await  db.getDb().collection('products').find({}).toArray();

   return products.map(function(productDoc) {
    return new Product(productDoc);
   });
   }

   updateImageData(){
    this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;  
        // this.imageDescriptionPath = `product-data/images/${this.descriptionImage}`;
        // this.imageDescriptionUrl = `/products/assets/descriptionImage/${this.descriptionImage}`;  
   }


   static async findMultiple(ids) {
    const productIds = ids.map(function(id) {
      return new mongodb.ObjectId(id);
    })
    
    const products = await db
      .getDb()
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }




async save() {
    const productDocument = {
        title: this.title,
        summary: this.summary,
        price: this.price,
        description: this.description,
        image: this.image,
        descriptionImage: this.descriptionImage ,
    };

    if(this.id) {
        const productId = new mongodb.ObjectId(this.id);
if(!this.image) {
  delete productDocument.image;
}

   await db.getDb().collection('products').updateOne({_id: productId}, {
    $set:productDocument
 });
    } else {
        await  db.getDb().collection('products').insertOne(productDocument);    //if we have an existing image
    }
  
}
async  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
}
 remove () {
    const productId = new mongodb.ObjectId(this.id);
    return  db.getDb().collection('products').deleteOne({_id: productId});
 } 

}


module.exports = Product;