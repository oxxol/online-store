import {createEl} from "../../components/createEl";
import {renderProductList} from "./renderProductList";
import {getState} from "./getState";
import {setPageNumber} from "./setPageNumber";

export const renderCartTitle = () => {
  const cartTitle = createEl('div', 'cart__title')
  cartTitle.classList.add('cart__item')
  const cartLabel = createEl('div', 'cart__title-label', 'Products In Cart')
  const itemsCount = createEl('div', 'cart__title-count', 'Items:')
  const checkCount = createEl('input', 'cart__title-count-input')
  checkCount.id='checkCount'
  if (checkCount instanceof HTMLInputElement){
    checkCount.type = 'text'
    checkCount.autocomplete="off"
    checkCount.defaultValue = localStorage.getItem('countOfItemsOnCartPage') || '3'
  }
  const pageNavigation = createEl('div', 'cart__title-navigation','Page:')
  const btnBack = createEl('button', 'cart__title-navigation-btn','<')
  btnBack.classList.add('back')
  const btnForward = createEl('button', 'cart__title-navigation-btn','>')
  btnForward.classList.add('forward')
  const pageNumber = createEl('div', 'cart__title-navigation-page','1')
  cartTitle.appendChild(cartLabel)
  cartTitle.appendChild(itemsCount)
  cartTitle.appendChild(checkCount)
  pageNavigation.appendChild(btnBack)
  pageNavigation.appendChild(pageNumber)
  pageNavigation.appendChild(btnForward)
  cartTitle.appendChild(pageNavigation)
  checkCount.onchange=(e)=>{
    const target = e.target as HTMLInputElement;
    const list = <HTMLElement>cartTitle.nextSibling
    list.replaceChildren()
    localStorage.setItem('countOfItemsOnCartPage',target.value)
    renderProductList(getState(),list,+target.value)
  }

  pageNavigation.addEventListener('click',(e)=>{
    const currentElement = <Element>e.target
    const cartList = document.querySelector('.cart__list')as HTMLElement
    if (currentElement.classList.contains('back')) {
      const pageNumber = setPageNumber('cart__title-navigation-page',-1)
      cartList.replaceChildren()
      renderProductList(getState(),cartList,3,pageNumber)
    } else if (currentElement.classList.contains('forward')) {
      const pageNumber = setPageNumber('cart__title-navigation-page',1)
      cartList.replaceChildren()
      renderProductList(getState(),cartList,3,pageNumber)
    }
  })

  return cartTitle
}