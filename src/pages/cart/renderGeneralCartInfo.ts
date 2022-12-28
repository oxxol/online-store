import {createEl} from "../../components/createEl";
import {promo} from "../../data/promo";
import {Promo} from "../../types/types";
import {getDiscount} from "./getDiscount";

export const renderGeneralCartInfo = () => {
  const countItems=localStorage.getItem('cartCountTotalJewelryStore')
  const generalCartInfo = createEl('div','cart__summary')
  const infoTitle = createEl('div','cart__summary-title','Summary')
  const infoWrapper = createEl('div','cart__summary-wrapper')
  const countProducts = createEl('div','cart__summary-count',`Products: ${countItems}`)
  const cartTotal = createEl('div','cart__summary-total')
  cartTotal.textContent= localStorage.getItem('cartTotalJewelryStore')? 'Total: $'+localStorage.getItem('cartTotalJewelryStore') : 'Total: $0'
  const discountInput = createEl('input', 'cart__summary-discount-input')
  if (discountInput instanceof HTMLInputElement){
    discountInput.type = 'text'
    discountInput.autocomplete="off"
    discountInput.placeholder = 'Enter promo code'
  }
  const currentDiscount = createEl('div','discount-current')
  const addButton =createEl('button','discount-current-btn','ADD')
  // currentDiscount.appendChild(addButton)
  // currentDiscount.classList.add('hide')
  infoWrapper.appendChild(countProducts)
  infoWrapper.appendChild(cartTotal)
  if(localStorage.getItem('appliedCodesJewelryStore')){
    getDiscount(cartTotal)
  }

  generalCartInfo.appendChild(infoTitle)
  generalCartInfo.appendChild(infoWrapper)
  generalCartInfo.appendChild(discountInput)
  generalCartInfo.appendChild(currentDiscount)


  discountInput.addEventListener('input',(e)=>{

    const target = <HTMLInputElement>e.target
    const promoItem = promo.find(item=>item.code===target.value)
    if(promoItem){
      currentDiscount.insertAdjacentHTML('afterbegin',`<div>${promoItem.name} - ${promoItem.discount}%</div>`)
      const usedPromo = JSON.parse(`${localStorage.getItem('appliedCodesJewelryStore')}`)
      if(!usedPromo || usedPromo.findIndex((el:Promo)=>el.code===promoItem.code)===-1) {
        currentDiscount.appendChild(addButton)
        addButton.classList.remove('hide')
        addButton.onclick = () => {
          // if(infoWrapper.lastChild!==null) infoWrapper.lastChild.remove()
          // renderAppliedCodes(promoItem)
          addButton.classList.add('hide')
          getDiscount(cartTotal,promoItem)
        }
      }

    }
    else{
      // if( currentDiscount.firstElementChild!==null && !currentDiscount.firstElementChild.classList.contains('discount-current-btn') ){
      //   currentDiscount.firstElementChild.remove()
      currentDiscount.replaceChildren()

    }

  })
  return generalCartInfo
}