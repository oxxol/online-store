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





















// import { options } from "../../app/app"
// import { Option } from "../../types/types"
// import { createURL } from "./createURL";
// import { filteredGoods } from "./filteredGoods";

// export function createOptions(typeFilter: Option, value: string | string[]) {
//   // console.log(typeFilter, value)
//   if (typeFilter === 'collection' || typeFilter === 'category' &&  typeof value === 'string' ) {
//     if (!options[typeFilter].includes(value as string)) {
//       options[typeFilter].push(value as string)
//     } else {
//       const index: number = options[typeFilter].indexOf(value as string);
//       options[typeFilter].splice(index, 1)
//     }
//   } else {
//     options[typeFilter] = value as string[]
//   }
    
//   createURL(options)
//   filteredGoods(options)

// }