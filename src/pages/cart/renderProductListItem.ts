import {createEl} from "../../components/createEl";
import {goods} from "../../data/goods";
import { ItemInCart} from "../../types/types";
import {updateItemTotal} from "./updateItemTotal";

export const renderProductListItem = (product: ItemInCart, index: number) => {
  const item = goods.find((item) => item.id === product.id);
  const cartItem = createEl('div', 'cart__item');

  cartItem.setAttribute('id', `${product.id}`);

  if (item) {
    const itemNumber = createEl('div', 'cart__item-number', `${index}`);
    const itemImg = createEl('div', 'cart__item-img');
    const img = createEl('img', 'img');
    const itemDetails = createEl('div', 'cart__details');
    const itemName = createEl('div', 'cart__details-name', item.name);
    const itemColor = createEl('div', 'cart__details-color', `Color: ${item.color}`);
    const itemOtherInfo = createEl('div', 'cart__details-other');
    const rating = '★'.repeat(Number(item.rating)) + '☆'.repeat(5 - Number(item.rating));
    const itemRating = createEl('div', 'cart__details-other-rating',`Rating: ${rating}`);
    const itemPrice = createEl('div', 'cart__details-price',`Price: $${item.price}`)
    const countControls = createEl('div', 'cart__controls');
    const stockCount = createEl('div', 'cart__controls-stock',`Stock: ${product.stock}`);
    const countInfo = createEl('div', 'cart__controls-info');
    const decrementBtn = createEl('button', 'cart__controls-decrement', '-');
    const itemCount = createEl('div', 'cart__controls-count',`${product.count}`);
    const incrementBtn = createEl('button', 'cart__controls-increment', '+');
    const totalCost= createEl('div', 'cart__controls-total',`Total: $${product.total}`);

    if (img instanceof HTMLImageElement) {
      img.setAttribute('src', item.img[0]);
      img.setAttribute('alt', item.name);
    }

    itemImg.classList.add('open-item-details-page')
    itemDetails.classList.add('open-item-details-page');

    decrementBtn.id=item.id;
    incrementBtn.id=item.id;
    itemImg.appendChild(img);
    itemDetails.appendChild(itemName);
    itemDetails.appendChild(itemColor);
    itemOtherInfo.appendChild(itemRating);
    itemDetails.appendChild(itemOtherInfo);
    itemDetails.appendChild(itemPrice);
    countInfo.appendChild(decrementBtn);
    countInfo.appendChild(itemCount);
    countInfo.appendChild(incrementBtn);
    countControls.appendChild(stockCount);
    countControls.appendChild(countInfo);
    countControls.appendChild(totalCost);
    cartItem.appendChild(itemNumber);
    cartItem.appendChild(itemImg);
    cartItem.appendChild(itemDetails);
    cartItem.appendChild(countControls);

    countInfo.addEventListener('click',updateItemTotal)
  }

  return cartItem;
}