import { ItemInCart} from "../../types/types";

export const getState = () => {
  let state: ItemInCart[];
  const cartStateJewelryStore = localStorage.getItem('cartStateJewelryStore');

  if (cartStateJewelryStore) {
    state = JSON.parse(cartStateJewelryStore);
  } else {
    state = [];
  }

  return state;
}