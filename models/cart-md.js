const path = require('path');
const fs = require('fs');

const pathToFile = path.join(__dirname, '../data', 'cart.json');

const getCartProducts = callback => {
  fs.readFile(pathToFile, (err, content) => {
    if(err) return callback([]);
    return callback(JSON.parse(content));
  });
}

const checkExistingThenAdd = (product, callback) => {
  getCartProducts(products => {
    const newCartProducts = [...products];
    const prodIndex = newCartProducts.findIndex(prod => prod.id === product.id);
    if(prodIndex !== -1){
      newCartProducts[prodIndex].quantity = parseInt(newCartProducts[prodIndex].quantity) + 1;
      callback(newCartProducts);
    } else {
      const newProduct = {...product};
      newCartProducts.push(newProduct);
      callback(newCartProducts);
    }
  });
}

module.exports = class Cart {
  static addProduct(product){
    checkExistingThenAdd(product, cartProducts => {
      fs.writeFile(pathToFile, JSON.stringify(cartProducts, null, 2), err => {
        console.log(err);
      });
    });
  }
  static removeProduct(productId){
    getCartProducts(cartProducts => {
      const newCart = cartProducts.filter(prod => prod.id !== productId);
      fs.writeFile(pathToFile, JSON.stringify(newCart, null, 2), err => {
        console.log(err);
      });
    });
  }
  static fetchCart(callback){
    getCartProducts(cartProducts => {
      callback(cartProducts)
    });
  }
}