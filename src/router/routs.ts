import {renderMain} from "../pages/main/renderMain";
import {renderCart} from "../pages/cart/renderCart";
import {renderProductDetails} from "../pages/product-details/renderProductDetails";

export const routs:{[key:string]: <T extends string | undefined>(v: T)=>HTMLElement}={
  '/': renderMain,
  'main':renderMain,
  'cart':renderCart,
  'product-details':renderProductDetails,
}