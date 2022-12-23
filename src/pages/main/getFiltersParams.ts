import { FiltersParams, Param } from "../../types/types"
import { filteringGoods } from "./filteringGoods"

export function getFiltersParams() {
  const params = new URLSearchParams(window.location.search)
  const filtersParams: FiltersParams = {}
  for (const [key, value] of params) {
    filtersParams[key as Param] = value.split(',')
  }
  filteringGoods(filtersParams)
}