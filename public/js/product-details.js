(function(){
  const hiddenPrice = document.getElementById('hidden-price');
  const quantityBtns = document.querySelectorAll('.quantity-grid button');
  const quantityField = document.querySelector('.quantity-grid input');
  const productPrice = document.getElementById('product-price');
  const frontImage = document.querySelector('.front-image');
  const backImage = document.querySelector('.back-image');
  const mainImage = document.querySelector('.product-image-wrap img');

  frontImage.addEventListener('click', updateMainImageHandler);
  backImage.addEventListener('click', updateMainImageHandler);

  [...quantityBtns].forEach((btn, index) => {
    btn.addEventListener('click', changeQuantityHandler.bind(null, index));
  });
  
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
    updateProductPrice();
  }
  function updateProductPrice(){
    const total = (quantityField.value * parseFloat(hiddenPrice.value)).toFixed(2);
    productPrice.textContent = `$${total}`;
  }
  updateProductPrice();
}());