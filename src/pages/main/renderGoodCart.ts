import { createEl } from "../../components/createEl";
import { goods } from "../../data/goods";
// import { renderProductDetails } from "../product-details/renderProductDetails";
import { getFiltersParams } from "./getFiltersParams";
import {updateProductList} from "../cart/updateProductList";
import {Item} from "../../types/types";

export function renderGoodCart(id: string) {
// <<<<<<< HEAD
  const card = createEl('div', 'card');
  const filtersParams = getFiltersParams();
  const view = filtersParams.view?.join('') === 'small'? '5':'4';
  const item = goods.find((item) => item.id === id);
  card.style.setProperty('max-width', `calc(100% / ${view} - 0.4rem)`);
  card.setAttribute('id', `${id}-card`);
  const cartState = localStorage.getItem('cartStateJewelryStore')?JSON.parse(`${localStorage.getItem('cartStateJewelryStore')}`):[];

  if (item) {
    const cardImg = createEl('img', 'card__img');
    if (cardImg instanceof HTMLImageElement) cardImg.setAttribute('src', item.img[0])
    const cardName = createEl('span', 'card__name', item.name);
    const cardPrice = createEl('span', 'card__price', `$ ${(item.price).toString()}`);
    const cardCollection = createEl('span', 'card__collection', `collection: ${item.collection}`);
    const cardCategory = createEl('span', 'card__category', `category: ${item.category}`);
    const rating = '★'.repeat(Number(item.rating)) + '☆'.repeat(5 - Number(item.rating))
    const cardRating = createEl('span', 'card__rating', `rating: ${rating}`)
    const cardStock = createEl('span', 'card__stock', `stock: ${item.stock}`);
    const cardBtns = createEl('div', 'card__buttons');
    const cardBtnAdd = createEl('button', 'card__button-add', 'Add to cart');
    if (cartState) { 
      cartState.forEach((goodInCart: { id: string; }) => {
        if (goodInCart.id === item.id) {
          cardBtnAdd.classList.add('incart')
          card.classList.add('incart')
          cardBtnAdd.textContent= 'Drop from cart'
        }
      })
    }
    const cardBtnDetails = createEl('button', 'card__button-details', 'Details');
    cardBtnDetails.id = id
    
    const cardBtnAdded='Drop from cart';
    cardBtnDetails.classList.add('open-item-details-page');

    // if (cardImg instanceof HTMLImageElement) {
    //   cardImg.setAttribute('src', item.img[0]);
    // }

    if(cartState.some((item:Item)=>item.id==id)){
      cardBtnAdd.classList.add('added-item');
      cardBtnAdd.textContent = cardBtnAdded;
    }

    cardBtns.appendChild(cardBtnAdd);
    cardBtns.appendChild(cardBtnDetails);
    card.appendChild(cardImg);
    card.appendChild(cardName);
    card.appendChild(cardPrice);
    card.appendChild(cardCollection);
    card.appendChild(cardCategory);
    card.appendChild(cardStock);
    card.appendChild(cardRating);
    card.appendChild(cardBtns);

    cardBtnAdd.addEventListener('click',()=>{
      cardBtnAdd.classList.toggle('added-item');

      if (cardBtnAdd.classList.contains('added-item')){
        updateProductList(id, 1);
        cardBtnAdd.textContent='Drop from cart';
      }else{
        updateProductList(id, 0);
        cardBtnAdd.textContent='ADD to cart';
      }
    })
    // =======
    //   const card = createEl('div', 'card')
    //   const filtersParams = getFiltersParams()
    //   const view = filtersParams.view?.join('') === 'small'? '5':'4'
    //   card.style.setProperty('max-width', `calc(100% / ${view} - 0.4rem)`)
    //   card.setAttribute('id', `${id}-card`)
    //   const item = goods.find((item) => item.id === id)
    //   const goodsInCart = JSON.parse(localStorage.getItem('cartStateJewelryStore') as string)


    //   if (item) {
    //     const cardImg = createEl('img', 'card__img')
    //     if (cardImg instanceof HTMLImageElement) cardImg.setAttribute('src', item.img[0])
    //     const cardName = createEl('span', 'card__name', item.name)
    //     const cardPrice = createEl('span', 'card__price', `$ ${(item.price).toString()}`)
    //     const cardCollection = createEl('span', 'card__collection', `collection: ${item.collection}`)
    //     const cardCategory = createEl('span', 'card__category', `category: ${item.category}`)
    //     const rating = '★'.repeat(Number(item.rating)) + '☆'.repeat(5 - Number(item.rating))
    //     const cardRating = createEl('span', 'card__rating', `rating: ${rating}`)
    //     const cardStock = createEl('span', 'card__stock', `stock: ${item.stock}`)
    //     const cardBtns = createEl('div', 'card__buttons')
    //     const cardBtnAdd = createEl('button', 'card__button-add', 'Add to cart')
    //     if (goodsInCart) { 
    //       goodsInCart.forEach((goodInCart: { id: string; }) => {
    //         if (goodInCart.id === item.id) {
    //           cardBtnAdd.classList.add('incart')
    //           card.classList.add('incart')
    //           cardBtnAdd.textContent= 'Drop from cart'
    //         }
    //       })
    //     }
    //     const cardBtnDetails = createEl('button', 'card__button-details', 'Details')
    //     cardBtnDetails.id=id
    //     cardBtns.appendChild(cardBtnAdd)
    //     cardBtns.appendChild(cardBtnDetails)
    //     card.appendChild(cardImg)
    //     card.appendChild(cardName)
    //     card.appendChild(cardPrice)
    //     card.appendChild(cardCategory)
    //     card.appendChild(cardCollection)
    //     card.appendChild(cardRating)
    //     card.appendChild(cardStock)
    //     card.appendChild(cardBtns)
    //     // card.addEventListener('click', ()=>renderProductDetails(id))
    // >>>>>>> 5c09620 (feat: add product-details page)
  }
  
  return card
}
