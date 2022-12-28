import {createEl} from "../../components/createEl";
import {goods} from "../../data/goods";
import {getState} from "./getState";
import {renderProductList} from "./renderProductList";

export const updateProductList = (id: string, quantity: number) => {
  const cartList = document.querySelector('.cart__list')
  let cartState = getState()
  const productList = createEl('div', 'cart__list')
  const countItems = document.querySelector('.header__cart-count')
  let currentItem = cartState.find(item => item.id === id)
  if (currentItem) {
    if (currentItem.stock - quantity >= 0) {
      currentItem.stock = (currentItem.stock || 0) - quantity
      currentItem.count = (currentItem.count || 0) + quantity
      currentItem.total = currentItem.count * currentItem.price
    }
  } else {
    currentItem = goods.find(item => item.id === id)
    if (currentItem) {
      currentItem.count = 1
      currentItem.stock -= 1
      currentItem.total = currentItem.price
      cartState = [...cartState, currentItem]
    }
  }
  const currentIndex = cartState.findIndex(item => item.id === id)
  if (currentItem!.count === 0) {
    cartState = [
      ...cartState.slice(0, currentIndex),
      ...cartState.slice(currentIndex + 1),
    ]
  }
  renderProductList(cartState, productList)
  if (countItems) countItems.textContent = cartState.length.toString()
  localStorage.setItem('cartStateJewelryStore', JSON.stringify(cartState))
  const total = cartState.reduce((acc, el) => {
    acc += el.total ?el.total: 0
    return acc
  }, 0)
  const totalCount=cartState.reduce((acc,el)=>{
    acc += el.count ?el.count: 0
    return  acc
  },0)
  localStorage.setItem('cartTotalJewelryStore', total.toString())
  localStorage.setItem('cartCountTotalJewelryStore', totalCount.toString())
  document.querySelector('.header__cart-total-count')!.textContent = `$${total}`
  document.querySelector('.cart__summary-total')!.textContent = `Total: $${total}`
  document.querySelector('.cart__summary-count')!.textContent = `Products: ${totalCount}`
  if (cartList!==null){
    cartList.replaceChildren()
    cartList.appendChild(productList)
  }
}