import {createEl} from "../../components/createEl";
import {goods} from "../../data/goods";
import {renderProductList} from "./renderProductList";
import {updateCartTotal} from "./updateCartTotal";
import {CartServices} from "./cartServices";

export const updateProductList = (id: string, quantity: number) => {
  const cartList = document.querySelector('.cart__list');
  let cartState = CartServices.getState();
  const productList = createEl('div', 'cart__list');
  const countItems = document.querySelector('.header__cart-count');
  const generalCartInfo = document.querySelector('.cart__summary');
  let currentItem = cartState.find(item => item.id === id);

  if (currentItem) {
    const updateStockCount = currentItem.stock - quantity;
    const updateItemCount = (currentItem.count || 0) + quantity;
    if (updateStockCount >= 0 && updateItemCount<=currentItem.stock) {
      currentItem.count = updateItemCount;
      currentItem.total = currentItem.count * currentItem.price;
    }
  } else {
    currentItem = goods.find(item => item.id === id);

    if (currentItem) {
      currentItem.count = 1;
      currentItem.total = currentItem.price;
      cartState = [...cartState, currentItem];
    }
  }

  const currentIndex = cartState.findIndex(item => item.id === id);

  if (currentItem  && currentItem.count!==null){

    if (currentItem.count === 0 || quantity === 0) {
      cartState = [
        ...cartState.slice(0, currentIndex),
        ...cartState.slice(currentIndex + 1),
      ]
    }

  }

  if(cartState.length==0){
    generalCartInfo && generalCartInfo.replaceChildren();
  }

  if (countItems) {
    countItems.textContent = cartState.length.toString();
  }

  localStorage.setItem('cartStateJewelryStore', JSON.stringify(cartState));
  updateCartTotal();
  renderProductList(cartState, productList);
  if (cartList!==null){
    cartList.replaceChildren();
    cartList.appendChild(productList);
  }

}