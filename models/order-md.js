const { getDb } = require("../util/nosql-database");

class Order {
  constructor(customerId, products, total){
    this.customerId = customerId;
    this.products = products;
    this.total = total;
  }
  create(){
    const db = getDb();
    return db.collection("orders").insertOne(this)
    .then(order => order)
    .catch(err => console.log(err));
  }
  static checkExisting({userId}, ){
    const db = getDb();
    return db.collection("orders").find({userId})
    .then(order => order)
    .catch(err => console.log(err));
  }
  static updateExisting({userId, order}){
    const db = getDb();
    return db.collection("orders").updateOne({userId}, {order})
    .then(order => order)
    .catch(err => console.log(err));
  }
}

module.exports = Order;