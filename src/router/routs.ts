import {renderMain} from "../pages/main/renderMain";
import {renderCart} from "../pages/cart/renderCart";
import {renderErrorPage} from "../pages/error/renderErrorPage";

export const routs:{[key:string]:HTMLElement}={
  '/': renderMain(),
  'main':renderMain(),
  'cart':renderCart(),
  '**': renderErrorPage()
}