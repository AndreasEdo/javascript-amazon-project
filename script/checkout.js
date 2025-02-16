import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { moneyConvert } from './utils/money.js';



const orderSummary = document.getElementById('order-summary');
cart.forEach((item) => {
    const orderId = item.id;
    let matchingId;
    products.forEach((product)=>{
        if(product.id === orderId){
            matchingId = product;
        }
    });

    orderSummary.innerHTML += `<div class="cart-item-container js-cart-item-container-${matchingId.id}">
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
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
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
    });
});