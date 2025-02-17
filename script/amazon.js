import {cart, addToCarts, updateCartQuantity} from '../data/cart.js';
import {products, productToCartNotif} from '../data/products.js';
import { moneyConvert } from './utils/money.js';


updateCartQuantity();
const productGrid = document.getElementById("products-grid");
products.forEach((product) => {
    productGrid.innerHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${moneyConvert(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select data-product-id="${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
        `;
});

const addToCart = document.querySelectorAll(".js-add-to-cart");
const quantitySelect = document.querySelector('.product-quantity-container select');
addToCart.forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);

        addToCarts(productId);
        updateCartQuantity();
        const quantitySelect = document.querySelector(`.product-quantity-container select[data-product-id="${productId}"]`);
        productToCartNotif(addedToCart, productId);
        const selectedQuantity = quantitySelect.value;
        console.log(selectedQuantity);

        

        
    });
});

