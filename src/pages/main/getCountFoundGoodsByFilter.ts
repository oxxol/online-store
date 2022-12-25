import { Item, ItemKey } from "../../types/types";
import { filteringGoods } from "./filteringGoods";

export function getCountFoundGoodsByFilter(typeFilter: string, formValue: string) {
  const filteredGoods= filteringGoods()
  const count = filteredGoods.reduce((acc: number, item: Item) => {
    if ((item[typeFilter as ItemKey]as string).toLowerCase() === formValue) {
      acc++
    }
    return acc
  }, 0);
  
  return count
}