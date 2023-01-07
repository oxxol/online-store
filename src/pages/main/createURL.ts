import { Param } from "../../types/types";
import { filteringGoods } from "./filteringGoods";

export function createURL(key: Param, value: string) {
  const url = window.location.origin
  const params = new URLSearchParams(window.location.search.slice(1))
  const hash = window.location.hash
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
    if (value.length === 0) params.delete(key)
  }
  const newUrl = new URL(url)
  newUrl.hash = hash
  newUrl.search = params.toString()
  // const newUrl = `${url}?${params.toString()}`
  window.history.pushState({}, "", newUrl) 
  filteringGoods()
} 





// export function createURL(key: Param, value: string) {
//   const url = window.location.href
//   console.log(url, url.lastIndexOf('?'), url.lastIndexOf('#'))
//   const existing = (url.lastIndexOf('?') > url.lastIndexOf('#')) ?
//     url.substring (url.lastIndexOf('?') + 1) : '';
//   console.log('existing', existing)
  
//   const params = new URLSearchParams(existing);
//   if (key === 'collection' || key === 'category') {
//     if (params.has(key)) {
//       const values = params.getAll(key).join('').split(',')
//       if (!values.includes(value)) {
//         values.push(value)
//         params.set(key, values.join(','))
//       } else if (values.includes(value) && values.length === 1) {
//         values.splice(0, 1)
//         params.delete(key)
//       } else if (values.includes(value)) {
//         values.splice(values.indexOf(value), 1)
//         params.set(key, values.join(','))   
//       }
//     } else {
//       params.set(key, value)
//     }
//   }
//   else {
//     params.set(key, value)
//     if (value.length === 0) params.delete(key)
//   }
//   const newUrl = `${url.replace(`?${existing}`, '')}?${params.toString()}`;
//   console.log('newUrl', newUrl)
//   // window.location.search = params.toString()
//   window.history.pushState({}, "", newUrl)
//   filteringGoods()
// }