export const calculateNumberOfPages = (allCountOfGoods:number, countGoodsOnPage:number) => {
  const countPages=  Math.ceil(allCountOfGoods/countGoodsOnPage)

  localStorage.setItem('countOfPagesOnCart',countPages.toString())

  return countPages
}