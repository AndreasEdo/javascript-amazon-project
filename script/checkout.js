import {cart, removeFromCart, updateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { moneyConvert } from './utils/money.js';

updateCartQuantity();
const orderSummary = document.getElementById('order-summary');
cart.forEach((item) => {
  const orderId = item.productId;
  let matchingId;
  products.forEach((product)=>{
    if(product.id === orderId){
        matchingId = product;
    }
  });
  console.log(matchingId);
  orderSummary.innerHTML += `<div class="cart-item-container js-cart-item-container-${orderId}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingId.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingId.name}
              </div>
              <div class="product-price">
                $${moneyConvert(matchingId.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingId.id}">
                  Update
                </span>
                <input class="quantity-input" type="number">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingId.id}">
                    Save
                  </span>
                </input>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingId.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">

              <div class="delivery-options-title">
                  Choose a delivery option:
              </div>
              <div class="delivery-option">
                  <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${orderId}">
                  <div>
                      <div class="delivery-option-date">
                      Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                      FREE Shipping
                      </div>
                  </div>
                  </div>
                  <div class="delivery-option">
                  <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${orderId}">
                  <div>
                      <div class="delivery-option-date">
                      Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                      $4.99 - Shipping
                      </div>
                  </div>
                  </div>
                  <div class="delivery-option">
                  <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${orderId}">
                  <div>
                      <div class="delivery-option-date">
                      Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                      $9.99 - Shipping
                      </div>
                  </div>
              </div>

            </div>
          </div>
        </div>`
});

const jsDelete = document.querySelectorAll('.js-delete-link');
jsDelete.forEach((link) => {
    link.addEventListener('click', () =>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const productIdContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        productIdContainer.remove();
        updateCartQuantity();
        const quantityLabel = document.querySelector(`.js-cart-item-container-${productId} .quantity-label`);
        quantityLabel.textContent = newQuantity;
    });
    
});

const jsUpdate = document.querySelectorAll('.js-update-link');
jsUpdate.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    // Get the correct cart item container
    const cartItemContainer = link.closest(`.js-cart-item-container-${productId}`);

    // Get input fields inside this specific cart item container
    const saveInput = cartItemContainer.querySelector(`.save-quantity-link`);
    const quantityInput = cartItemContainer.querySelector(`.quantity-input`);
    const updateLink = cartItemContainer.querySelector('.update-quantity-link');

    // Add editing class to only the selected product input fields
    quantityInput.classList.add('is-editing-quantity-input');
    saveInput.classList.add('is-editing-quantity-save');
    updateLink.classList.add('is-editing-quantity-update');
    
    // Optional: Auto-focus on the input field when clicking update
    quantityInput.focus();
  });
});

function updateItemQuantity(productId, newQuantity){
  cart.forEach((item) => {
    if(productId === item.productId){
      item.quantity = newQuantity;
      localStorage.setItem("carts", JSON.stringify(cart));
    }
  })
}

const jsSave = document.querySelectorAll('.js-save-link');
jsSave.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const cartItemContainer = link.closest(`.js-cart-item-container-${productId}`);
    const saveInput = cartItemContainer.querySelector(`.save-quantity-link`);
    const quantityInput = cartItemContainer.querySelector(`.quantity-input`);
    const updateLink = cartItemContainer.querySelector('.update-quantity-link');

    // Remove editing classes
    quantityInput.classList.remove('is-editing-quantity-input');
    saveInput.classList.remove('is-editing-quantity-save');
    updateLink.classList.remove('is-editing-quantity-update');

    // Check if the input value is valid (e.g., a number and greater than 0)
    const newQuantity = parseInt(quantityInput.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateItemQuantity(productId, newQuantity);
      const quantityLabel = cartItemContainer.querySelector('.quantity-label');
      quantityLabel.innerHTML = newQuantity;
    } else {
      // Optionally, show an error if the quantity is invalid
      alert('Please enter a valid quantity');
    }
    
    updateCartQuantity();

  });
});


