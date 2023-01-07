import { ParamOfCart } from "../../types/types";

export function createURLCart(key: ParamOfCart, value: string) {
  const url = window.location.origin
  const params = new URLSearchParams(window.location.search.slice(1))
  const hash = window.location.hash
  if (params.has(key)) {
    params.set(key, value)
  }
  else {
    params.append(key, value)
  }
  const newUrl = new URL(url)
  newUrl.hash = hash
  newUrl.search = params.toString()

  // const newUrl = `${url}?${params.toString()}`
  window.history.pushState({}, "", newUrl)
  
}
