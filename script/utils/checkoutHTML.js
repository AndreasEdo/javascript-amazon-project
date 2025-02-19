import {cart, removeFromCart, updateCartQuantity} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {deliveryOptions} from '../../data/deliveryoptions.js';

function paymentCount(){
    let paymentInfo = {
      priceCents : 0,
      quantity : 0
    };
    cart.forEach((item) => {
      products.forEach((product) =>{
        if(product.id === item.productId){
          paymentInfo.priceCents += product.priceCents * item.quantity;
        }
      });
      paymentInfo.quantity += item.quantity;
      
    });
    paymentInfo.priceCents = (paymentInfo.priceCents/100).toFixed(2);
    return paymentInfo;
  }
  
  function updatePaymentHTML(){
    const paymentItemsContainer = document.getElementById('payment-items');
    const paymentSummaryContainer = document.getElementById('payment-summary-money-container');
  
    const paymentInfo = paymentCount();
    paymentItemsContainer.innerHTML =  `Items (${paymentInfo.quantity}):`;
    paymentSummaryContainer.innerHTML = `$${paymentInfo.priceCents}`;
  }
  
  
  function shippingCount(){
    const shippingRadios = document.querySelectorAll('.js-delivery-radio');
  
    let totalShippingCents = 0;
  
    shippingRadios.forEach(radio => {
      if (radio.checked) {
        const deliveryId = radio.dataset.deliveryId;
        const deliveryOption = deliveryOptions.find(option => option.id === deliveryId);
        
        if (deliveryOption) {
          totalShippingCents += deliveryOption.deliveryCents;
        }
      }
    });
  
    const formattedShipping = totalShippingCents === 0 ? "FREE" : `$${(totalShippingCents / 100).toFixed(2)}`;
    return formattedShipping;
  }
  
  
  function updateShipping() {
    const shippingSummary = document.getElementById('shipping-summary-money');
  
    const formattedShipping = shippingCount();
  
    shippingSummary.innerHTML = formattedShipping;
  
  }
  
  function totalCount() {
    const paymentFormat = paymentCount(); 
    const shippingFormat = shippingCount(); 
  
  
    const paymentTotal = parseFloat(paymentFormat.priceCents);
  
  
    let shippingTotal = 0;
    if (shippingFormat !== "FREE") {
      shippingTotal = parseFloat(shippingFormat.replace("$", ""));
    }
  
    const total = paymentTotal + shippingTotal;
    return total.toFixed(2);
  }
  
  
  function totalBeforeTax(){
    const totalBeforeTaxes = document.getElementById('before-tax-js');
    const total = totalCount();
    totalBeforeTaxes.innerHTML = `$${total}`; 
  }
  
  function estimatedTax(){
    const taxBefore = parseFloat(totalCount());
    const tax = (taxBefore * 10 / 100).toFixed(2);
    return tax;
  }

  function estimatedTaxHTML(){
    const tax = estimatedTax();
    const taxSummary = document.getElementById('tax-summary');
    taxSummary.innerHTML = `$${tax}`;
  }

  function updateOrderTotal(){
    const total = parseFloat(totalCount());
    const estimatedTaxes = parseFloat(estimatedTax());
    const AllTotal = total + estimatedTaxes;
    const paymentSummary = document.getElementById('payment-summary-js');
    paymentSummary.innerHTML = `$${AllTotal}`;
  }
  
  export function updateCheckoutHTML(){
    totalBeforeTax();
    updateShipping();
    updatePaymentHTML();
    estimatedTaxHTML();
    updateOrderTotal();
  }
  