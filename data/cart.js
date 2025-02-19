export let cart = JSON.parse(localStorage.getItem('carts'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage(){
    localStorage.setItem("carts", JSON.stringify(cart));
}

export function addToCarts(productId){
    let matchingItem = cart.find((item) => item.productId === productId);
  
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
 }
  
export function updateCartQuantity(){
    let cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    saveToStorage();
}
  
export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((item) => {
        if(item.productId !== productId){
            newCart.push(item);
        }
    });
    cart = newCart;
    saveToStorage();
}



