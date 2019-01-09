(function(){
  const productPrice = document.getElementById('product-price');
  const quantityBtns = document.querySelectorAll('.quantity-grid button');
  const quantityField = document.querySelector('.quantity-grid input');
  const productTotal = document.getElementById('product-total');

  [...quantityBtns].forEach((btn, index) => {
    btn.addEventListener('click', changeQuantityHandler.bind(null, index));
  });
  function changeQuantityHandler(btnIndex){
    if(btnIndex === 0 && quantityField.value > 1){
      quantityField.value = parseInt(quantityField.value) - 1;
    } else if(btnIndex !== 0 && quantityField.value < 99) {
      quantityField.value = parseInt(quantityField.value) + 1;
    }
    updateProductTotal();
  }
  function updateProductTotal(){
    const total = (quantityField.value * parseFloat(productPrice.value)).toFixed(2);
    productTotal.textContent = `$ ${total}`;
  }
  updateProductTotal();
}());