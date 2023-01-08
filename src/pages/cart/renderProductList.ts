import {renderProductListItem} from "./renderProductListItem";
import {ItemInCart} from "../../types/types";
import {setPageNumber} from "./setPageNumber";
import {createEl} from "../../components/createEl";

export const renderProductList = (array:ItemInCart[],wrapper: HTMLElement,countItems?:number,currentPage=1) => {

  if(array.length ==0 ) {
    setTimeout(()=>{
      const cart = document.querySelector('.cart__page');
      const cartInfo = createEl('h2','cart__page-description','empty cart')
      if(cart!==null) {
        cart.replaceChildren();
        cart.appendChild(cartInfo)
      }

    })

  }else {
    const localItemsCount = localStorage.getItem('countOfItemsOnCartPage');

    if(localItemsCount) {
      countItems = Number(localItemsCount);
    }

    const localCurrentPage = localStorage.getItem('currentPage');

    if(localCurrentPage) {
      currentPage = Number(localCurrentPage);
    }

    if(!countItems){

      if(localStorage.getItem('countOfItemsOnCartPage')){
        countItems = Number(localStorage.getItem('countOfItemsOnCartPage'));
      }
      else{
        countItems=3;
      }
    }

    let start = countItems*(currentPage-1);
    while(array[start]===undefined){
      start-=countItems;
      currentPage = setPageNumber('cart__title-navigation-page',-1);
    }
    const end =start+ countItems;
    array.forEach((item, index) => {

      if(index>=start && index<end){
        wrapper.appendChild(renderProductListItem(item, index + 1));
      }

    })
  }
}