(function(){
  const productPrice = document.getElementById('product-price');
  const quantityBtns = document.querySelectorAll('.quantity-grid button');
  const quantityField = document.querySelector('.quantity-grid input');
  const productTotal = document.getElementById('product-total');
  const frontImage = document.querySelector('.front-image');
  const backImage = document.querySelector('.back-image');
  const mainImage = document.querySelector('.product-image-wrap img');
  const promoField = document.getElementById('promo-code');
  const promoResult = document.getElementById('promo-result');

  frontImage.addEventListener('click', updateMainImageHandler);
  backImage.addEventListener('click', updateMainImageHandler);
  promoField.addEventListener('input', checkPromoCode);

  [...quantityBtns].forEach((btn, index) => {
    btn.addEventListener('click', changeQuantityHandler.bind(null, index));
  });
  
  function checkPromoCode(){
    if(promoField.value === 'XW3F897X'){
      promoResult.textContent = '10% First Order';
      promoResult.style.color = '#28a745';
    } else {
      promoResult.textContent = 'No code';
      promoResult.style.color = '#343a40';
    }
  }
  function updateMainImageHandler(e){
    e = e || window.event;
    const targetStyle = e.target.getAttribute('style').split('url(')[1].slice(0, -1);
    mainImage.setAttribute('src', targetStyle);
  }
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
    productTotal.textContent = `$${total}`;
  }
  updateProductTotal();
}());