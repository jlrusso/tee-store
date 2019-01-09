(function(){
  const reduceBtns = document.getElementsByClassName('reduce-btn');
  const increaseBtns = document.getElementsByClassName('increase-btn');
  const quantityFields = document.querySelectorAll('.item-quantity-wrap input');
  const itemPriceFields = document.querySelectorAll('.item-price-wrap > p');
  
  [...reduceBtns].forEach((btn, index) => {
    updateItemPrice(index);
    btn.addEventListener('click', reduceQuantityHandler.bind(null, index));
  });
  [...increaseBtns].forEach((btn, index) => {
    btn.addEventListener('click', increaseQuantityHandler.bind(null, index));
  });
  
  function reduceQuantityHandler(index){
    if(quantityFields[index].value > 1){
      quantityFields[index].value = parseInt(quantityFields[index].value) - 1;
      updateItemPrice(index);
    }
  }
  function increaseQuantityHandler(index){
    if(quantityFields[index].value < 99) {
      quantityFields[index].value = parseInt(quantityFields[index].value) + 1;
      updateItemPrice(index);
    }
  }
  function updateItemPrice(index){
    const itemPrice = itemPriceFields[index].getAttribute('data-price');
    const itemTotal = (quantityFields[index].value * parseFloat(itemPrice).toFixed(2));
    itemPriceFields[index].textContent = `$ ${itemTotal}`;
  }
}());