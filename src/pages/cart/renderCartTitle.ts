import {createEl} from "../../components/createEl";
import {renderProductList} from "./renderProductList";
import {getState} from "./getState";
import { pagePagination } from "./pagePagination";
import { createURLCart } from "./createURLCart";
import { getURLParam } from "./getURLParam";


export const renderCartTitle = () => {
  const cartTitle = createEl('div', 'cart__title');
  const cartLabel = createEl('div', 'cart__title-label', 'Products In Cart');
  const itemsCount = createEl('div', 'cart__title-count', 'Items:');
  const checkCount = createEl('input', 'cart__title-count-input');
  const pageNavigation = createEl('div', 'cart__title-navigation','Page:');
  const btnBack = createEl('button', 'cart__title-navigation-btn','<');
  const btnForward = createEl('button', 'cart__title-navigation-btn','>');
  const pageNumber = createEl('div', 'cart__title-navigation-page','1');
  // const localCurrentPage = localStorage.getItem('currentPage');
  const localCurrentPage = getURLParam('page');


  if(localCurrentPage) {
    pageNumber.textContent = localCurrentPage;
  }

  cartTitle.classList.add('cart__item');
  btnBack.classList.add('back');
  btnForward.classList.add('forward');
  checkCount.id='checkCount';

  if (checkCount instanceof HTMLInputElement){
    checkCount.type = 'text';
    checkCount.autocomplete = "off";
    checkCount.defaultValue = getURLParam('items') || '3';
    // checkCount.defaultValue = localStorage.getItem('countOfItemsOnCartPage') || '3';
  }

  cartTitle.appendChild(cartLabel);
  cartTitle.appendChild(itemsCount);
  cartTitle.appendChild(checkCount);
  pageNavigation.appendChild(btnBack);
  pageNavigation.appendChild(pageNumber);
  pageNavigation.appendChild(btnForward);
  cartTitle.appendChild(pageNavigation);

  checkCount.onchange=(e)=>{
    const target = e.target as HTMLInputElement;
    const list = <HTMLElement>cartTitle.nextSibling;
    list.replaceChildren();
    // localStorage.setItem('countOfItemsOnCartPage', target.value);
    createURLCart('items', target.value);
    renderProductList(getState(),list,+target.value);
  }

  pageNavigation.addEventListener('click',pagePagination);

  return cartTitle
}