import {Promo} from "../../types/types";

export const updateAppliedPromoCodes = (item?: Promo) => {
  const appliedCodesJewelryStore = localStorage.getItem('appliedCodesJewelryStore');

  if(item) {

    if (!appliedCodesJewelryStore) {
      localStorage.setItem('appliedCodesJewelryStore', JSON.stringify([item]));
    } else if (!JSON.parse(appliedCodesJewelryStore).find((el:Promo)=>el.code===item.code)) {
      localStorage.setItem('appliedCodesJewelryStore', JSON.stringify([...JSON.parse(appliedCodesJewelryStore), item]));
    }

  }

  return localStorage.getItem('appliedCodesJewelryStore');
}