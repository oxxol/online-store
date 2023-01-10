import { createEl } from "../../components/createEl";
import { goods } from "../../data/goods";
import { filteringGoods } from "./filteringGoods";
import { getFiltersParams } from "./getFiltersParams";
import { renderGoodCard} from "./renderGoodCard";

export function renderStoreGoods() {
  const storeGoods = createEl('div', 'store__goods')
  const filtersParams = getFiltersParams()
  const filteredGoods = Object.keys(filtersParams).length === 0 ? goods : filteringGoods()
  if (filteredGoods.length === 0) {
    const notFound = createEl('div', 'not-found','No products found')
    storeGoods.appendChild(notFound)
  }
  filteredGoods.forEach((good) => {
    storeGoods.appendChild(renderGoodCard(good.id))
  })

  return storeGoods
}


