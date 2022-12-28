import {calculateNumberOfPages} from "./calculateNumberOfPages";

export const setPageNumber = (selector:string,quantity: number) => {
  let pageNumber=Number(document.querySelector(`.${selector}`)!.textContent)
  let countOfGoodsInCart=0
  let countItemsOnPage=3
  if(localStorage.getItem('cartStateJewelryStore')!==null){
    countOfGoodsInCart =  (JSON.parse(`${localStorage.getItem('cartStateJewelryStore')}`).length)
  }
  if(localStorage.getItem('countOfItemsOnCartPage')!==null){
    countItemsOnPage = Number(localStorage.getItem('countOfItemsOnCartPage'))
  }
  const countOfPagesInCart= calculateNumberOfPages(countOfGoodsInCart,countItemsOnPage)
  if(pageNumber+quantity>0 && pageNumber+quantity<=countOfPagesInCart) pageNumber+=quantity
  document.querySelector(`.${selector}`)!.textContent =pageNumber.toString()
  localStorage.setItem('currentPage',pageNumber.toString())

  return pageNumber
}