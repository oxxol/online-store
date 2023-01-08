import {createEl} from "../../components/createEl";
import {renderProductList} from "./renderProductList";
import {renderCartTitle} from "./renderCartTitle";
import {getState} from "./getState";
import {renderGeneralCartInfo} from "./renderGeneralCartInfo";

export function renderCart() {
  const cartWrapper = createEl('main', 'cart__page');
  const cart = createEl('div', 'cart');
  const cartTitle = renderCartTitle();
  const cartList = createEl('div', 'cart__list');
  const state = getState();

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

