import {createEl} from "../../components/createEl";
import {promo} from "../../data/promo";
import {Promo} from "../../types/types";
import {getDiscount} from "./getDiscount";
import { renderPurchaseModal } from "./renderPurchaseModal";

export const renderGeneralCartInfo = () => {
  const countItems=localStorage.getItem('cartCountTotalJewelryStore');
  const generalCartInfo = createEl('div','cart__summary');
  const infoTitle = createEl('div','cart__summary-title','Summary');
  const infoWrapper = createEl('div','cart__summary-wrapper');
  const countProducts = createEl('div','cart__summary-count',`Products: ${countItems}`);
  const cartTotalContent= localStorage.getItem('cartTotalJewelryStore')? 'Total: $'+localStorage.getItem('cartTotalJewelryStore') : 'Total: $0';
  const cartTotal = createEl('div','cart__summary-total',`${cartTotalContent}`);
  const discountInput = createEl('input', 'cart__summary-discount-input');
  const discountExample = createEl('div', 'cart__summary-discount-example','Promo for test: \'rs\', \'epm\'');
  const currentDiscount = createEl('div','discount-current');
  const addButton =createEl('button','discount-current-btn','ADD');
  const appliedCodesJewelryStore = localStorage.getItem('appliedCodesJewelryStore');
  const btnBuyNow = createEl('button', 'cart__summary-btn-buy', 'Buy now');

  if (discountInput instanceof HTMLInputElement){
    discountInput.type = 'text';
    discountInput.autocomplete="off";
    discountInput.placeholder = 'Enter promo code';
  }

  infoWrapper.appendChild(countProducts);
  infoWrapper.appendChild(cartTotal);

  if(appliedCodesJewelryStore){
    getDiscount(cartTotal);
  }

  generalCartInfo.appendChild(infoTitle);
  generalCartInfo.appendChild(infoWrapper);
  generalCartInfo.appendChild(discountInput);
  generalCartInfo.appendChild(discountExample);
  generalCartInfo.appendChild(currentDiscount);
  generalCartInfo.appendChild(btnBuyNow);

  discountInput.addEventListener('input',(e)=>{
    const target = <HTMLInputElement>e.target;
    const promoItem = promo.find(item=>item.code===target.value);

    if(promoItem){
      currentDiscount.insertAdjacentHTML('afterbegin',`<div>${promoItem.name} - ${promoItem.discount}%</div>`);
      const usedPromo = JSON.parse(`${localStorage.getItem('appliedCodesJewelryStore')}`);
      const isPromoApplied = usedPromo?.findIndex((el:Promo)=>el.code===promoItem.code);

      if(!usedPromo || isPromoApplied===-1) {
        currentDiscount.appendChild(addButton);
        addButton.classList.remove('hide');
        addButton.onclick = () => {
          addButton.classList.add('hide');
          getDiscount(cartTotal,promoItem);
        }
      }
    }
    else{
      currentDiscount.replaceChildren();
    }

  })

  btnBuyNow.addEventListener('click', renderPurchaseModal);

  return generalCartInfo;
}