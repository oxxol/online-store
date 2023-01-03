import {createEl} from "../../components/createEl";
import {Promo} from "../../types/types";
import {getDiscount} from "./getDiscount";
import {updateAppliedPromoCodes} from "./updateAppliedPromoCodes";

export const renderAppliedCodes = (item?: Promo) => {
  const appliedCodesJewelryStore = item
    ? updateAppliedPromoCodes(item)
    : localStorage.getItem('appliedCodesJewelryStore');
  const promoTable = createEl('div','promo-wrapper');
  const promoTitle = createEl('div','promo-title','Applied codes:');
  const currentTotal = document.querySelector('.cart__summary-total');
  let appliedCodesArray:Promo[] = JSON.parse(appliedCodesJewelryStore || '[]');

  promoTable.appendChild(promoTitle);

  appliedCodesArray.forEach((el: Promo, index: number) => {
    const promoItem = createEl('div', 'promo-item', `${el.name} - ${el.discount}%`);
    const dropBtn = createEl('button', 'drop-button', 'DROP');
    const currentDiscont = document.querySelector('.discount-current');

    promoItem.appendChild(dropBtn);
    promoTable.appendChild(promoItem);

    dropBtn.onclick = () => {
      promoTable.removeChild(promoItem);
      appliedCodesArray = [
        ...appliedCodesArray.slice(0, index),
        ...appliedCodesArray.slice(index + 1),
      ]

      if(currentDiscont) {

        if (currentDiscont.firstElementChild?.textContent!.includes(el.name)) {
          currentDiscont.lastElementChild?.classList.remove('hide');
        }

      }

      if (appliedCodesArray.length>0) {
        localStorage.setItem('appliedCodesJewelryStore', JSON.stringify(appliedCodesArray));
      } else {
        currentTotal?.classList.remove('cancelled');
        localStorage.removeItem('appliedCodesJewelryStore');
        promoTable.parentElement?.replaceChildren();

        return promoTable;
      }

      const cartTotal = document.querySelector('.cart__summary-total') as HTMLDivElement;

      if (cartTotal!==null ) {
        getDiscount(cartTotal);
      }

    }
  })

  return promoTable
}