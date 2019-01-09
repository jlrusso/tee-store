const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

const pathToFile = path.join(__dirname, '../data', 'products.json');

const getProductsFromFile = callback => {
  fs.readFile(pathToFile, (err, content) => {
    if(err){
      return callback([]);
    } else {
      return callback(JSON.parse(content));
    }
  });
}

module.exports = class Product {
  constructor(name, image, price){
    this.name = name;
    this.image = image;
    this.price = price;
  }
  addProduct(){
    this.id = uniqid();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(pathToFile, JSON.stringify(products, null, 2), err => {
        console.log(err);
      });
    });
  }
  static getProductDetails(productId, callback){
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === productId);
      callback(product);
    });
  }
  static editProduct(productId){
    getProductsFromFile(() => {

    });
  }
  static fetchProducts(callback){
    getProductsFromFile(products => {
      callback(products);
    });
  }
}