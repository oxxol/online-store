import { Param } from "../../types/types";
import { getFiltersParams } from "./getFiltersParams";

export function createURL(key: Param, value: string) {
  const url = window.location.origin
  const params = new URLSearchParams(window.location.search.slice(1))
  if (key === 'collection' || key === 'category') {
    if (params.has(key)) {
      const values = params.getAll(key).join('').split(',')
      if (!values.includes(value)) {
        values.push(value)
        params.set(key, values.join(','))
      } else if (values.includes(value) && values.length === 1) {
        values.splice(0, 1)
        params.delete(key)
      } else if (values.includes(value)) {
        values.splice(values.indexOf(value), 1)
        params.set(key, values.join(','))   
      }
    } else {
      params.set(key, value)
    }
  }
  else {
    params.set(key, value)
  }
  const newUrl = `${url}?${params.toString()}`
  window.history.pushState({}, "", newUrl)
  getFiltersParams()
} 
