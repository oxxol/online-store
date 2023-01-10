import {createEl} from "../../components/createEl";
import {renderProductList} from "./renderProductList";
import { pagePagination } from "./pagePagination";
import {CartServices} from "./cartServices";

export const renderCartTitle = () => {
  const cartTitle = createEl('div', 'cart__title');
  const cartLabel = createEl('div', 'cart__title-label', 'Products In Cart');
  const itemsCount = createEl('div', 'cart__title-count', 'Items:');
  const checkCount = createEl('input', 'cart__title-count-input');
  const pageNavigation = createEl('div', 'cart__title-navigation','Page:');
  const btnBack = createEl('button', 'cart__title-navigation-btn','<');
  const btnForward = createEl('button', 'cart__title-navigation-btn', '>');
  const pageNumber = createEl('div', 'cart__title-navigation-page', '1');
  const currentPage = Number(CartServices.getURLParams('page'));
  const lastPage = Number(localStorage.getItem('countOfPagesOnCart'));
  const cartCountTotalJewelryStore = localStorage.getItem('cartCountTotalJewelryStore');

  if (currentPage > lastPage && lastPage > 0) {
    pageNumber.textContent = lastPage.toString()
  } else if ((currentPage < lastPage && currentPage > 0)) {
    pageNumber.textContent = currentPage.toString()
  }
  
  cartTitle.classList.add('cart__item');
  btnBack.classList.add('back');
  btnForward.classList.add('forward');
  checkCount.id='checkCount';

  if (checkCount instanceof HTMLInputElement){
    checkCount.type = 'number';
    checkCount.min = '1';
    checkCount.max =cartCountTotalJewelryStore? cartCountTotalJewelryStore.toString():'1';
    checkCount.autocomplete = "off";
    checkCount.defaultValue = CartServices.getURLParams('items') || '3';


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
    CartServices.createURLCart('items', target.value);
    renderProductList(CartServices.getState(),list,+target.value);
  }

  pageNavigation.addEventListener('click',pagePagination);

  return cartTitle
}