import {CartServices} from "./cartServices";

export const updateCartTotal = () => {
  const cartState = CartServices.getState();
  const cartTotalCount =document.querySelector('.header__cart-total-count');
  const cartItemsCount =document.querySelector('.header__cart-count');
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
    CartServices.getDiscount(cartTotal);
  }

  if(cartSummaryCount!==null){
    cartSummaryCount.textContent = `Products: ${totalCount}`;
  }
  if(cartItemsCount!==null){
    cartItemsCount.textContent = `${totalCount}`;
  }
}