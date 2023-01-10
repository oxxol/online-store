import {createEl} from "../../components/createEl";
import { goods } from "../../data/goods";
import { Item } from "../../types/types";
import { updateProductList } from "../cart/updateProductList";
import {renderPurchaseModal} from "../cart/renderPurchaseModal";
import {CartServices} from "../cart/cartServices";

export const renderProductDetails = <T extends string | undefined>(id: T) => {
  const item = goods.find(item => item.id === id);
  const cartState = localStorage.getItem('cartStateJewelryStore') ? JSON.parse(`${localStorage.getItem('cartStateJewelryStore')}`) : [];
  const productDetails = createEl('main', 'product-details');

  if (item) {
    const breadCrumb = createEl('div', 'breadcrumb');
    const breadCrumbList = createEl('ul', 'breadcrumb__list');
    const breadCrumbStore = createEl('li', 'breadcrumb__item', 'store');
    const breadCrumbCategory = createEl('li', 'breadcrumb__item', `${item.category}`);
    const breadCrumbCollection = createEl('li', 'breadcrumb__item', `${item.collection}`);
    const breadCrumbName = createEl('li', 'breadcrumb__item', `${item.name}`);
    const goodSection = createEl('section', 'good');
    const imagesBlock = createEl('div', 'good__images');
    const previews = createEl('div', 'images__previews');
    const photo = createEl('img', 'images__photo');
    const descriptionBlock = createEl('div', 'good__description');
    const name = createEl('h1', 'description__name', item.name);
    const rating = createEl('span', 'description__name', `${'★'.repeat(Number(item.rating)) + '☆'.repeat(5 - Number(item.rating))}`);
    const price = createEl('span', 'description__price', `$${item.price}`);
    const category = createEl('span', 'description__category', `category: ${item.category}`);
    const collection = createEl('span', 'description__collection', `collection: ${item.collection}`);
    const color = createEl('span', 'description__color', `color: ${item.color}`);
    const metal = createEl('span', 'description__metal', `metal: ${item.metal}`);
    const stock = createEl('span', 'description__stock', `stock: ${item.stock}`);
    const description = createEl('p', 'description__description', `${item.description}`);
    const btns = createEl('div', 'description__buttons');
    const btnAdd = createEl('button', 'button__add', 'Add to cart');
    const btnBuy = createEl('button', 'button__buy', 'Buy now');

    breadCrumbList.appendChild(breadCrumbStore);
    breadCrumbList.appendChild(breadCrumbCategory);
    breadCrumbList.appendChild(breadCrumbCollection);
    breadCrumbList.appendChild(breadCrumbName);
    breadCrumb.appendChild(breadCrumbList);
    breadCrumbStore.setAttribute('data-href', 'main');
    breadCrumbStore.classList.add('pages');

    if (photo instanceof HTMLImageElement) {
      photo.setAttribute('src', item.img[0]);
      photo.setAttribute('alt', item.name);
    }

    item.img.forEach(el => {
      const container = createEl('div', 'images__previews-container');
      const img = createEl('img', 'images__previews-preview');
      img.setAttribute('src', el);
      img.setAttribute('alt', item.name);
      container.appendChild(img);
      previews.appendChild(container);
      img.addEventListener('click', () => {
        if (photo instanceof HTMLImageElement && img instanceof HTMLImageElement) photo.src = img.src;
      })
    });


    if (cartState.some((item: Item) => item.id == id)) {
      btnAdd.classList.add('added-item')
      btnAdd.textContent = 'Remove'
    }

    btnBuy.setAttribute('data-href','cart');
    btnBuy.classList.add('pages');
    imagesBlock.appendChild(previews);
    imagesBlock.appendChild(photo);
    btns.appendChild(btnAdd);
    btns.appendChild(btnBuy);
    descriptionBlock.appendChild(name);
    descriptionBlock.appendChild(rating);
    descriptionBlock.appendChild(price);
    descriptionBlock.appendChild(category);
    descriptionBlock.appendChild(collection);
    descriptionBlock.appendChild(color);
    descriptionBlock.appendChild(metal);
    descriptionBlock.appendChild(stock);
    descriptionBlock.appendChild(description);
    descriptionBlock.appendChild(btns);
    goodSection.appendChild(imagesBlock);
    goodSection.appendChild(descriptionBlock);
    productDetails.appendChild(breadCrumb);
    productDetails.appendChild(goodSection);

    btns.addEventListener('click', (e) => {
      const target = <HTMLInputElement>e.target;
      if (target.classList.contains('button__add')) {
        btnAdd.classList.toggle('added-item');
        if (typeof id == 'string') {
          if (btnAdd.classList.contains('added-item')) {
            updateProductList(id, 1);
            btnAdd.textContent = 'Remove';
          } else {
            updateProductList(id, 0);
            btnAdd.textContent = 'Add to cart';
          }
        }
      }else if(target.classList.contains('button__buy')) {

        if (typeof id == 'string') {
          const cartState = CartServices.getState();
          const currentItemIndex= cartState.findIndex((el)=>el.id===id)
          if(currentItemIndex<0) {
            updateProductList(id, 1);
          }

        }
        setTimeout(()=>{
          renderPurchaseModal();
        })

      }
    })

  }

  return productDetails;
}



