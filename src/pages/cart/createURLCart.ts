import { ParamOfCart } from "../../types/types";

export function createURLCart(key: ParamOfCart, value: string) {
  const url = window.location.origin
  const params = new URLSearchParams(window.location.search.slice(1))
  const hash = window.location.hash
  const pathname = window.location.pathname
  const newUrl = new URL(url)

  if (params.has(key)) {
    params.set(key, value)
  }
  else {
    params.append(key, value)
  }
  
  newUrl.hash = hash
  newUrl.search = params.toString()
  newUrl.pathname = pathname
  window.history.pushState({}, "", newUrl) 
}