import { createEl } from "../../components/createEl";
import { goods } from "../../data/goods";
import { getFiltersParams } from "./getFiltersParams";
import {updateProductList} from "../cart/updateProductList";
import {Item} from "../../types/types";

export function renderGoodCard(id: string) {
  const card = createEl('div', 'card');
  const filtersParams = getFiltersParams();
  const view = filtersParams.view?.join('') === 'small' ? '5' : '4';
  const item = goods.find((item) => item.id === id);
  const cartState = localStorage.getItem('cartStateJewelryStore')?JSON.parse(`${localStorage.getItem('cartStateJewelryStore')}`):[];

  card.style.setProperty('max-width', `calc((100% - ${(Number(view) - 1)}rem) / ${view})`);
  card.setAttribute('id', `${id}-card`);
  card.classList.add('open-item-details-page');

  if (item) {
    const cardImgContainer = createEl('div', 'card__img-container');
    const cardImg = createEl('img', 'card__img');
    if (cardImg instanceof HTMLImageElement) cardImg.setAttribute('src', item.img[0]);
    cardImg.setAttribute('alt', item.name)
    cardImg.classList.add('open-item-details-page');
    const cardName = createEl('span', 'card__name', item.name);
    const cardPrice = createEl('span', 'card__price', `$ ${(item.price).toString()}`);
    const cardCollection = createEl('span', 'card__collection', `collection: ${item.collection}`);
    const cardCategory = createEl('span', 'card__category', `category: ${item.category}`);
    const rating = '★'.repeat(Number(item.rating)) + '☆'.repeat(5 - Number(item.rating));
    const cardRating = createEl('span', 'card__rating', `rating: ${rating}`)
    const cardStock = createEl('span', 'card__stock', `stock: ${item.stock}`);
    const cardBtns = createEl('div', 'card__buttons');
    const cardBtnAdd = createEl('button', 'card__button-add', 'Add to cart');

    if(cartState.some((item: Item) => item.id == id)) {
      cardBtnAdd.classList.add('added-item');
      cardBtnAdd.textContent = 'Remove';
      card.classList.add('added-item');
    }

    const cardBtnDetails = createEl('button', 'card__button-details', 'Details');
    cardBtnDetails.id = id;
    cardBtnDetails.classList.add('open-item-details-page');

    cardBtns.appendChild(cardBtnAdd);
    cardBtns.appendChild(cardBtnDetails);
    cardImgContainer.appendChild(cardImg);
    card.appendChild(cardImgContainer);
    card.appendChild(cardName);
    card.appendChild(cardPrice);
    card.appendChild(cardCategory);
    card.appendChild(cardCollection);
    card.appendChild(cardRating);
    card.appendChild(cardStock);
    card.appendChild(cardBtns);

    cardBtnAdd.addEventListener('click', () => {
      cardBtnAdd.classList.toggle('added-item');

      if (cardBtnAdd.classList.contains('added-item')){
        updateProductList(id, 1);
        cardBtnAdd.textContent = 'Remove';
        card.classList.add('added-item');
      } else {
        updateProductList(id, 0);
        cardBtnAdd.textContent = 'Add to cart';
        card.classList.remove('added-item');
      }

    })
  }

  return card
}



