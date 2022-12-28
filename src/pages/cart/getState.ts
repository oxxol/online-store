import {Item} from "../../types/types";

export const getState = () => {
  let state: Item[]
  if (localStorage.getItem('cartStateJewelryStore')) {
    state = JSON.parse(`${localStorage.getItem('cartStateJewelryStore')}`)
  } else {
    state = []
  }

  return state
}