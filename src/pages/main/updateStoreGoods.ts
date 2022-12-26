import { createEl } from "../../components/createEl"
import { Item } from "../../types/types"
import { renderGoodCart } from "./renderGoodCart"

export function updateStoreGoods(filteredGoods: Item[]) {
  const storeGoods = document.querySelector('.store__goods')
  const found = document.querySelector('.found__block-count')
  const filteredGoodsId = filteredGoods.map((good) => good.id)

  if (storeGoods instanceof HTMLDivElement) {
    storeGoods.innerHTML = ''
    if (filteredGoodsId.length === 0) {
      const notFound = createEl('div', 'not-found','No products found')
      storeGoods.appendChild(notFound)
    }
    filteredGoodsId.forEach((id) => { storeGoods.appendChild(renderGoodCart(id))    
    })
  }
  if (found instanceof HTMLElement) found.textContent = filteredGoodsId.length.toString()
}