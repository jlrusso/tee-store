const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class Cart {
  constructor(userId){
    this.userId = userId;
    this.products = [];
    this.total = 0;
  }
  create(){
    const db = getDb();
    return db.collection("carts").insertOne(this)
    .then(() => console.log("cart created"))
    .catch(() => console.log("cart not created"));
  }
  static updateCart(userId, products){
    const db = getDb();
    return db.collection("carts").updateOne(
      {userId: new ObjectId(userId)}, 
      {$set: {products}}
    ).then(() => console.log("products updated"))
    .catch(() => console.log("products not updated"));
  }
  static addToCart(userId, product){
    const db = getDb();
    return db.collection("carts").updateOne(
      {userId: new ObjectId(userId)}, 
      {$push: {products: product}}
    ).then(() => console.log("product added"))
    .catch(err => console.log(err));
  }
  static fetch(userId){
    const db = getDb();
    return db.collection("carts").findOne({userId: new ObjectId(userId)})
    .then(cart => cart)
    .catch(() => console.log("could not fetch cart"));
  }
  static async remove(userId, prodId){
    const db = getDb();
    const dbCart = await db.collection("carts").findOne({userId: new ObjectId(userId)});
    const updatedProducts = dbCart.products.filter(product => product.productId !== prodId);
    return db.collection("carts").updateOne({userId: new ObjectId(userId)}, {$set: {products: updatedProducts}});
  }
}

module.exports = Cart;