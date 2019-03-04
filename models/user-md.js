const { getDb } = require("../util/database");
const Cart = require("../models/cart-md");

class User {
  constructor(username, email, password){
    this.username = username;
    this.email = email;
    this.password = password;
    this.admin = false;
  }
  create(){
    const db = getDb();
    return db.collection("users").insertOne(this)
    .then(user => Promise.resolve(user)).then(user => {
      const newCart = new Cart(user._id);
      newCart.create();
      return user;
    }).catch(err => console.log(err));
  }
  static fetch({username, password}){
    const db = getDb();
    return db.collection("users").findOne({username, password})
    .then(user => user)
    .catch(err => console.log(err));
  }
  static checkExisting({username, email}){
    const db = getDb();
    return db.collection("users").findOne({
      $or: [{username, email}, {email}]
    }).then(user => user)
    .catch(err => console.log(err));
  }
  static update(userId, cart){
    const db = getDb();
    return db.collection("users").updateOne({_id: new ObjectId(userId)}, {$set: {cart}})
    .then(() => console.log("cart updated"))
    .catch(() => console.log("cart not updated"));
  }
}

module.exports = User;