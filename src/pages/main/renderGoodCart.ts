import { createEl } from "../../components/createEl";
import { goods } from "../../data/goods";
import { getFiltersParams } from "./getFiltersParams";

export function renderGoodCart(id: string) {
  const card = createEl('div', 'card')
  const filtersParams = getFiltersParams()
  const view = filtersParams.view?.join('') === 'small'? '5':'4'
  card.style.setProperty('max-width', `calc(100% / ${view} - 0.4rem)`)
  card.setAttribute('id', `${id}-card`)
  const item = goods.find((item) => item.id === id)

  if (item) {
    const cardImg = createEl('img', 'card__img')
    if (cardImg instanceof HTMLImageElement) cardImg.setAttribute('src', item.img[0])
    const cardName = createEl('span', 'card__name', item.name)
    const cardPrice = createEl('span', 'card__price', `$ ${(item.price).toString()}`)
    const cardCollection = createEl('span', 'card__collection', `collection: ${item.collection}`)
    const cardCategory = createEl('span', 'card__category', `category: ${item.category}`)
    const cardStock = createEl('span', 'card__stock', `stock: ${item.stock}`)
    const cardRating = createEl('span', 'card__rating', `rating: ${item.rating}`)
    const cardBtns = createEl('div', 'card__buttons')
    const cardBtnAdd = createEl('button', 'card__button-add', 'Add to cart')
    const cardBtnDetails = createEl('button', 'card__button-details', 'Details')
    cardBtnDetails.id=id
    cardBtns.appendChild(cardBtnAdd)
    cardBtns.appendChild(cardBtnDetails)
    card.appendChild(cardImg)
    card.appendChild(cardName)
    card.appendChild(cardPrice)
    card.appendChild(cardCollection)
    card.appendChild(cardCategory)
    card.appendChild(cardStock)
    card.appendChild(cardRating)
    card.appendChild(cardBtns)
  }
  
  return card
}
