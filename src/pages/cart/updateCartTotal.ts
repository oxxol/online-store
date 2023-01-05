import {getDiscount} from "./getDiscount";
import {getState} from "./getState";

export const updateCartTotal = () => {
  const cartState = getState();
  const cartTotalCount =document.querySelector('.header__cart-total-count');
  const cartTotal =document.querySelector('.cart__summary-total')as HTMLElement;
  const cartSummaryCount=  document.querySelector('.cart__summary-count');
  const total = cartState.reduce((acc, el) => {
    acc += el.total ?el.total: 0
    return acc
  }, 0);
  const totalCount=cartState.reduce((acc,el)=>{
    acc += el.count ?el.count: 0
    return  acc
  },0);

  localStorage.setItem('cartTotalJewelryStore', total.toString());
  localStorage.setItem('cartCountTotalJewelryStore', totalCount.toString());

  if(cartTotalCount!==null) {
    cartTotalCount.textContent = `$${total}`
  }

  if(cartTotal!==null){
    cartTotal.textContent = `Total: $${total}`;
    getDiscount(cartTotal);
  }

  if(cartSummaryCount!==null){
    cartSummaryCount.textContent = `Products: ${totalCount}`;
  }
}