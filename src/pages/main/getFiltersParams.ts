import { FiltersParams, Param } from "../../types/types"

export function getFiltersParams() {
  // const url = window.location.href

  // const existing = (url.lastIndexOf('?') > url.lastIndexOf('#')) ?
  //   url.substring(url.lastIndexOf('?') + 1) : '';
  // const params = new URLSearchParams(existing)
  
  const params = new URLSearchParams(window.location.search.slice(1))
  const filtersParams: FiltersParams = {}
  for (const [key, value] of params) {
    filtersParams[key as Param] = value.split(',')
  }
  
  return filtersParams
}