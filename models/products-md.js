const uniqid = require('uniqid');
const db = require('../util/database');

module.exports = class Product {
  constructor(title, image, price){
    this.title = title;
    this.image = image;
    this.price = price;
  }
  addProduct(){
    return db.execute(`INSERT INTO products (title, price, image) VALUES (?, ?, ?)`, 
      [this.title, this.price, this.image] 
    );
  }
  static getProductDetails(productTitle){
    return db.execute('SELECT * FROM products WHERE title=?', [productTitle]);
  }
  static fetchProducts(){
    return db.execute('SELECT * FROM products');
  }
}