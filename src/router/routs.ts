import {renderMain} from "../pages/main/renderMain";
import {renderCart} from "../pages/cart/renderCart";

export const routs:{[key:string]:HTMLElement}={
  '/': renderMain(),
  'main':renderMain(),
  'cart':renderCart(),
}