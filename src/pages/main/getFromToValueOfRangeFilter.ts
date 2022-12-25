import { ItemKey, Param } from "../../types/types"
import { filteringGoods } from "./filteringGoods"
import { getFiltersParams } from "./getFiltersParams"

export function getFromToValueOfRangeFilter(typeFilter: Param) {
  const filtersParams = getFiltersParams()
  const filteredGoods = filteringGoods()
  let [from, to] = ['', '']

  if (filtersParams[typeFilter]) {
    from = filtersParams[typeFilter]![0]
    to = filtersParams[typeFilter]![1]
  }

  else {
    const arrOfValue: number[] = []
    filteredGoods.forEach((good) => {
      arrOfValue.push(Number(good[typeFilter as ItemKey]))
    })
    from = Math.min.apply(null, arrOfValue).toString()
    to = Math.max.apply(null, arrOfValue).toString()
  }
  
  return [from, to]
}