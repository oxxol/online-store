import {setPageNumber} from "./setPageNumber";
import {renderProductList} from "./renderProductList";
import {getState} from "./getState";

export const pagePagination = (e:Event)=>{
  const currentElement = <Element>e.target;
  const cartList = document.querySelector('.cart__list')as HTMLElement;

  if (currentElement.classList.contains('back')) {
    const pageNumber = setPageNumber('cart__title-navigation-page',-1);
    cartList.replaceChildren();
    renderProductList(getState(),cartList,3,pageNumber);
  } else if (currentElement.classList.contains('forward')) {
    const pageNumber = setPageNumber('cart__title-navigation-page',1);
    cartList.replaceChildren();
    renderProductList(getState(),cartList,3,pageNumber);
  }

}