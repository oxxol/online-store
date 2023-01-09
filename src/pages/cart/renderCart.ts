import {createEl} from "../../components/createEl";
import {renderProductList} from "./renderProductList";
import {renderCartTitle} from "./renderCartTitle";
import {renderGeneralCartInfo} from "./renderGeneralCartInfo";
import {CartServices} from "./cartServices";

export function renderCart() {
  const cartWrapper = createEl('main', 'cart__page');
  const cart = createEl('div', 'cart');
  const cartTitle = renderCartTitle();
  const cartList = createEl('div', 'cart__list');
  const state = CartServices.getState();

  if (state.length>0) {
    cart.appendChild(cartTitle);
  }

  renderProductList(state,cartList);
  cart.appendChild(cartList);
  cartWrapper.appendChild(cart);

  if (state.length>0) {
    cartWrapper.appendChild(renderGeneralCartInfo());
  }

  return cartWrapper;
}

