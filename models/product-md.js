const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class Product {
  constructor(title, description, frontImg, backImg, price){
    this.title = title;
    this.price = price;
    this.description = description;
    this.frontImg = frontImg;
    this.backImg = backImg;
  }
  create(){
    const db = getDb();
    return db.collection("products").insertOne(this)
    .then(result => {
      console.log(result);
    }).catch(err => console.log(err));
  }
  static fetch(prodId){
    const db = getDb();
    return db.collection("products").findOne({
      _id: new ObjectId(prodId)
    }).then(product => product)
    .catch(err => console.log(err));
  }
  static fetchSelect(prodIds, cart){
    const db = getDb();
    return db.collection("products").find({_id: {$in: prodIds}}).toArray()
    .then(products => ({products, cart}))
    .catch(err => console.log(err));
  }
  static fetchAll(){
    const db = getDb();
    return db.collection("products").find().toArray()
    .then(products => products)
    .catch(() => console.log("no products"));
  }
  static delete(prodId){
    const db = getDb();
    return db.collection("products").deleteOne({
      _id: new ObjectId(prodId)
    }).then(() => console.log('product deleted'))
    .catch(() => console.log('product not deleted'));
  }
  static update(prodId, product){
    const db = getDb();
    return db.collection("products").updateOne({
      _id: new ObjectId(prodId)
    }, {$set: product}).then(() => console.log('product updated'))
    .catch(() => console.log('product not updated'));
  }
}

module.exports = Product;