import { getURLParam } from "./getURLParam";
import {calculateNumberOfPages} from "./calculateNumberOfPages";
import { createURLCart } from "./createURLCart";

export const setPageNumber = (selector:string,quantity: number) => {
  let pageNumber = Number(getURLParam('page')) || 1;
  let countOfGoodsInCart = 0;
  let countItemsOnPage = 3;
  const cartStateJewelryStore = localStorage.getItem('cartStateJewelryStore');
  const countOfItemsOnCartPage = getURLParam('items');

  if(cartStateJewelryStore!==null){
    countOfGoodsInCart =  (JSON.parse(cartStateJewelryStore).length);
  }

  if(countOfItemsOnCartPage!==null){
    countItemsOnPage = Number(countOfItemsOnCartPage);
  }

  const countOfPagesInCart= calculateNumberOfPages(countOfGoodsInCart,countItemsOnPage);

  if(pageNumber+quantity>0 && pageNumber+quantity<=countOfPagesInCart) {
    pageNumber += quantity;
  }

  document.querySelector(`.${selector}`)!.textContent =pageNumber.toString();
  createURLCart('page', pageNumber.toString())

  return pageNumber;
}