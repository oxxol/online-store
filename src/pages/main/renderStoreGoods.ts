import { createEl } from "../../components/createEl";
import { goods } from "../../data/goods";
import { renderGoodCart } from "./renderGoodCart";

export function renderStoreGoods() {
  const storeGoods = createEl('div', 'store__goods')

  const arrGoodsId = goods.map((good) => good.id)
  console.log(arrGoodsId)
  arrGoodsId.forEach((id) => {
    storeGoods.appendChild(renderGoodCart(id))
  })

  return storeGoods
}