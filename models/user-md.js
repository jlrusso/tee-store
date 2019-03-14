const { getDb } = require("../util/database");

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
    .then(() => this)
    .catch(err => console.log(err));
  }
  static fetch(username){
    const db = getDb();
    return db.collection("users").findOne({username})
    .then(user => user)
    .catch(err => console.log(err));
  }
  static checkExisting({username, email}){
    const db = getDb();
    return db.collection("users").findOne({
      $or: [{username}, {email}]
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