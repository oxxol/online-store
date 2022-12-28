import {createEl} from "../../components/createEl";
import {Promo} from "../../types/types";
import {getDiscount} from "./getDiscount";

export const renderAppliedCodes = (item?: Promo) => {
  if(item) {
    if (!localStorage.getItem('appliedCodesJewelryStore')) {
      localStorage.setItem('appliedCodesJewelryStore', JSON.stringify([item]))
    } else if (!JSON.parse(`${localStorage.getItem('appliedCodesJewelryStore')}`).find((el:Promo)=>el.code===item.code)) {
      localStorage.setItem('appliedCodesJewelryStore', JSON.stringify([...JSON.parse(`${localStorage.getItem('appliedCodesJewelryStore')}`), item]))
    }
  }
  const promoTable=createEl('div','promo-wrapper')
  const promoTitle=createEl('div','promo-title','Applied codes')
  promoTable.appendChild(promoTitle)
  const currentTotal = document.querySelector('.cart__summary-total')
  let appliedCodesArray:Promo[]=JSON.parse(`${localStorage.getItem('appliedCodesJewelryStore')}`)
  appliedCodesArray.forEach((el: Promo, index: number) => {
    const promoItem = createEl('div', 'promo-item', `${el.name} - ${el.discount}%`)
    const dropBtn = createEl('button', 'drop-button', 'DROP')
    promoItem.appendChild(dropBtn)
    promoTable.appendChild(promoItem)
    dropBtn.onclick = () => {
      promoTable.removeChild(promoItem)
      appliedCodesArray = [
        ...appliedCodesArray.slice(0, index),
        ...appliedCodesArray.slice(index + 1),
      ]
      const currentDiscont = document.querySelector('.discount-current')
      if(currentDiscont) {
        if (currentDiscont.firstElementChild !== null) {
          if ((currentDiscont.firstElementChild).textContent!.includes(el.name)) {
            currentDiscont.lastElementChild!.classList.remove('hide')
          }
        }
      }
      if (appliedCodesArray.length>0) {
        localStorage.setItem('appliedCodesJewelryStore', JSON.stringify(appliedCodesArray))
      } else {
        currentTotal!.classList.remove('cancelled')
        localStorage.removeItem('appliedCodesJewelryStore');
        if(promoTable.parentElement!==null)  promoTable.parentElement.replaceChildren()
        return promoTable
      }
      const cartTotal = document.querySelector('.cart__summary-total') as HTMLDivElement
      if (cartTotal!==null ) {
        getDiscount(cartTotal)
      }
    }
  })
  return promoTable

}