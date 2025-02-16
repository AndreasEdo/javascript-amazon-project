export const cart = [
    {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },{
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3
    }
];

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
  