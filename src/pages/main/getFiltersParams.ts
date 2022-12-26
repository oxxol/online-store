import { FiltersParams, Param } from "../../types/types"

export function getFiltersParams() {
  const params = new URLSearchParams(window.location.search.slice(1))
  const filtersParams: FiltersParams = {}
  for (const [key, value] of params) {
    filtersParams[key as Param] = value.split(',')
  }
  
  return filtersParams
}