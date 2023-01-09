import {renderProductListItem} from "./renderProductListItem";
import {ItemInCart} from "../../types/types";
import {setPageNumber} from "./setPageNumber";
import {createEl} from "../../components/createEl";
import { getURLParams } from "./getURLParams";

export const renderProductList = (array:ItemInCart[],wrapper: HTMLElement,countItems?:number, currentPage=1) => {

  if(array.length ==0 ) {
    setTimeout(()=>{
      const cart = document.querySelector('.cart__page');
      const cartInfo = createEl('h2','cart__page-description','empty cart')
      const cartMessage = document.querySelector('.cart__purchase-message')

      if(cart!==null ) {

        if(cartMessage===null){
          cart.replaceChildren();
          cart.appendChild(cartInfo)
        }
      }
    })

  }else {
    const localItemsCount = Number(getURLParams('items')) || 3;
    if (localItemsCount) {
      countItems = localItemsCount;
    }
    currentPage = Number(getURLParams('page')) || 1;
    const lastPage = Number(localStorage.getItem('countOfPagesOnCart'))
    
    if (currentPage > lastPage && lastPage) {
      currentPage = lastPage
    }

    if(!countItems){

      if(getURLParams('items')){
        countItems = Number(getURLParams('items'));
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