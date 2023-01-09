import { getURLParams } from "./getURLParams";
import {calculateNumberOfPages} from "./calculateNumberOfPages";
import { createURLCart } from "./createURLCart";

export const setPageNumber = (selector: string, quantity: number) => {
  
  let pageNumber = Number(getURLParams('page')) || 1;
  const lastPage = Number(localStorage.getItem('countOfPagesOnCart'))

  if (pageNumber > lastPage && lastPage > 0) {
    pageNumber = lastPage
  }

  let countOfGoodsInCart = 0;
  let countItemsOnPage = 3;
  const cartStateJewelryStore = localStorage.getItem('cartStateJewelryStore');
  let countOfItemsOnCartPage = getURLParams('items');
  const cartCountTotalJewelryStore = localStorage.getItem('cartCountTotalJewelryStore')

  if (getURLParams('items')) {
    countOfItemsOnCartPage = Number(getURLParams('items')) > Number(countOfItemsOnCartPage) ?
      cartCountTotalJewelryStore : countOfItemsOnCartPage
  }

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

  const numberPageValue = document.querySelector(`.${selector}`)
  if(numberPageValue instanceof HTMLDivElement) numberPageValue.textContent = pageNumber.toString();
  createURLCart('page', pageNumber.toString())

  return pageNumber;
}