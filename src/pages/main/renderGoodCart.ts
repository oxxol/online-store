import { createEl } from "../../components/createEl";
import { goods } from "../../data/goods";

export function renderGoodCart(id:string) {
  const card = createEl('div', 'card')
  card.setAttribute('id', `${id}-card`)
  const item = goods.find((item) => item.id === id)

  if (item) {
    const cardImg = createEl('img', 'card__img')
    if (cardImg instanceof HTMLImageElement) cardImg.src = require(`../../assets/img/webp/${id}.webp`)
    const cardName = createEl('span', 'card__name', item.name)
    const cardPrice = createEl('span', 'card__price', `$ ${(item.price).toString()}`)
    const cardCollection = createEl('span', 'card__collection', `collection: ${item.collection}`)
    const cardCategory = createEl('span', 'card__category', `category: ${item.category}`)
    const cardMetal = createEl('span', 'card__metal', `metal: ${item.metal}`)
    const cardRating = createEl('span', 'card__rating', `rating: ${item.rating}`)
    const cardBtns = createEl('div', 'card__buttons')
    const cardBtnAdd = createEl('button', 'card__button-add', 'Add to cart')
    const cardBtnDetails = createEl('button', 'card__button-details', 'Details')
    
    cardBtns.appendChild(cardBtnAdd)
    cardBtns.appendChild(cardBtnDetails)
    card.appendChild(cardImg)
    card.appendChild(cardName)
    card.appendChild(cardPrice)
    card.appendChild(cardCollection)
    card.appendChild(cardCategory)
    card.appendChild(cardMetal)
    card.appendChild(cardRating)
    card.appendChild(cardBtns)
  }
  return card
}
