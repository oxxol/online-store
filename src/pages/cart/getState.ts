import { ItemInCart} from "../../types/types";

export const getState = () => {
  let state: ItemInCart[]

  if (localStorage.getItem('cartStateJewelryStore')) {
    state = JSON.parse(`${localStorage.getItem('cartStateJewelryStore')}`)
  } else {
    state = []
  }

  return state
}