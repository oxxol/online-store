import { Item } from "../../types/types";

export function sortingGoods(filteredGoods: Item[], sort: string) {
  if (sort === 'Price-LtoH') {
    filteredGoods.sort((a,b)=>a.price - b.price)
  }
  if (sort === 'Price-HtoL') {
    filteredGoods.sort((a,b)=>b.price - a.price)
  }
  if (sort === 'Rating-LtoH') {
    filteredGoods.sort((a,b)=> Number(a.rating) - Number(b.rating))
  }
  if (sort === 'Rating-HtoL') {
    filteredGoods.sort((a,b)=> Number(b.rating) - Number(a.rating))
  }
   
  if (sort === 'Collection-AtoZ') {
    filteredGoods.sort((a, b) => {
      if (a.collection.toLowerCase() <= b.collection.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    })
  }
  if (sort === 'Collection-ZtoA') {
    filteredGoods.sort((a, b) => {
      if (a.collection.toLowerCase() >= b.collection.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    })
  }

  return filteredGoods
}