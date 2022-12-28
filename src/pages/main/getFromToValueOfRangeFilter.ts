import { ItemKey, Param } from "../../types/types"
import { filteringGoods } from "./filteringGoods"

export function getFromToValueOfRangeFilter(typeFilter: Param) {
  const filteredGoods = filteringGoods()
  if (filteredGoods.length === 0) return ['not found', 'not found']
  const arrOfValue: number[] = []
  let [from, to] = ['', '']
  filteredGoods.forEach((good) => {
    arrOfValue.push(Number(good[typeFilter as ItemKey]))
  })
  from = Math.min.apply(null, arrOfValue).toString()
  to = Math.max.apply(null, arrOfValue).toString()

  return [from, to]
}

// export function getFromToValueOfRangeFilter(typeFilter: Param) {
//   const filtersParams = getFiltersParams()
//   const filteredGoods = filteringGoods()
//   if (filteredGoods.length === 0) return ['not found', 'not found']

// let [from, to] = ['', '']
// if (filtersParams[typeFilter]) {
//   from = filtersParams[typeFilter]![0]
//   to = filtersParams[typeFilter]![1]
// }

// else {
//   const arrOfValue: number[] = []
//   filteredGoods.forEach((good) => {
//     arrOfValue.push(Number(good[typeFilter as ItemKey]))
//   })
//   from = Math.min.apply(null, arrOfValue).toString()
//   to = Math.max.apply(null, arrOfValue).toString()
// }
// console.log(typeFilter, from, to)
//   return [from, to]
// }