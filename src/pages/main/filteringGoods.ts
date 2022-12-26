import { goods } from "../../data/goods";
import { Item } from "../../types/types";
import { getFiltersParams } from "./getFiltersParams";
import { updateStoreGoods } from "./updateStoreGoods";
import { sortingGoods } from "./sortingGoods";

export function filteringGoods() {
  const filtersParams = getFiltersParams()
  let filteredGoods: Item[] = goods.filter(good => {

    if (filtersParams.collection) {
      if (!filtersParams.collection.includes(good.collection.toLowerCase())) return false
    }
    if (filtersParams.category) {
      if (!filtersParams.category.includes(good.category.toLowerCase())) return false
    }
    if (filtersParams.price) {
      if (!(good.price >= Number(filtersParams.price[0]) && good.price <= Number(filtersParams.price[1]))) return false
    }
    if (filtersParams.stock) {
      if (!(good.stock >= Number(filtersParams.stock[0]) && good.stock <= Number(filtersParams.stock[1]))) return false
    }
    if (filtersParams.search) {
      const str = filtersParams.search.toString().toLowerCase()
      return ((good.name.toLowerCase().includes(str) || good.category.toLowerCase().includes(str) ||
        good.collection.toLowerCase().includes(str) || good.color.toLowerCase().includes(str) ||
        good.description.toLowerCase().includes(str) || good.metal.toLowerCase().includes(str) ||
        good.price.toString().toLowerCase().includes(str) || good.rating.toString().toLowerCase().includes(str) ||
        good.stock.toString().toLowerCase().includes(str)))
    }
    return true
  })

  if(filtersParams.sort) filteredGoods = sortingGoods(filteredGoods, filtersParams.sort[0])
  updateStoreGoods(filteredGoods)
  
  return filteredGoods
}