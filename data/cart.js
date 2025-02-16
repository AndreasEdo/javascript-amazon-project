export const cart = [];

export function addToCarts(productId){
    let matchingItem = cart.find((item) => item.productId === productId);
  
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }
  }
  
export function updateCartQuantity(){
    let cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
  