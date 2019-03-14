(function(){
  const reduceBtns = document.getElementsByClassName('reduce-btn');
  const increaseBtns = document.getElementsByClassName('increase-btn');
  const quantityFields = document.querySelectorAll('.cart-item-quantity-wrap input');
  const itemPriceFields = document.querySelectorAll('.cart-item-price');
  const cartSubtotal = document.getElementById('cart-subtotal');
  
  const reduceItemQuantity = index => {
    if(quantityFields[index].value > 1){
      quantityFields[index].value = parseInt(quantityFields[index].value) - 1;
      updateItemPrices();
    }
  };

  const increaseItemQuantity = index => {
    if(quantityFields[index].value < 99) {
      quantityFields[index].value = parseInt(quantityFields[index].value) + 1;
      updateItemPrices();
    }
  };

  const setCartSubtotal = () => {
    const subtotalVal = [...itemPriceFields].reduce((acc, field) => {
      return acc + parseFloat(field.textContent.replace('$ ', ''));
    }, 0);
    cartSubtotal.textContent = `$ ${subtotalVal.toFixed(2)}`;
  };

  const updateItemPrices = () => {
    [...itemPriceFields].forEach((field, index) => {
      const itemPrice = field.getAttribute('data-price');
      const itemTotal = (quantityFields[index].value * parseFloat(itemPrice)).toFixed(2);
      field.textContent = `$ ${itemTotal}`;
    });
    setCartSubtotal();
  };
  updateItemPrices();

  [...reduceBtns].forEach((btn, index) => {
    btn.addEventListener('click', reduceItemQuantity.bind(null, index));
  });
  [...increaseBtns].forEach((btn, index) => {
    btn.addEventListener('click', increaseItemQuantity.bind(null, index));
  });

}());