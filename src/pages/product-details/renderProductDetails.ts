import {createEl} from "../../components/createEl";
import { goods } from "../../data/goods";
import { Item } from "../../types/types";

export const renderProductDetails = <T extends string | undefined>(id: T) => {
  const card = createEl('div', 'cart')
  //   card.innerHTML=`
  //     <h2>Product details</h2>
  //     <h2>id = ${id}</h2>
  // <h3 data-href="main" class="pages" style="cursor:pointer">Main page</h3>
  // `

  localStorage.setItem('cartStateJewelryStore', JSON.stringify([{
    "id": "02",
    "name": "Drew Pendant",
    "img": ["./assets/image/02.webp", "./assets/image/02-1.webp"],
    "collection": "Pearls",
    "category": "necklace",
    "metal": "gold",
    "rating": "3",
    "color": "pearl",
    "bestsellers": 'false',
    "year": 2022,
    "price": 55.00,
    "stock": 4,
    "description": "Introducing your new favorite piece - a classic pendant featuring a luminous freshwater pearl on a beautifully delicate chain. An effortless way to add a sophisticated vibe to your outfit.",
  },
  {
    "id": "03",
    "name": "Pallas Drops",
    "img": ["./assets/image/03.webp", "./assets/image/03-1.webp"],
    "collection": "Luxe",
    "category": "earrings",
    "metal": "gold",
    "rating": "3",
    "color": "clear",
    "bestsellers": 'false',
    "year": 2019,
    "price": 90.00,
    "stock": 15,
    "description": "Crystal gems come together in this beautiful floral silhouette earring. The perfect dose of glam for that finishing touch you've been searching for. Pair with a cocktail dress or go business casual with these - the options are endless!",
  }]))
  const item = goods.find(item => item.id === id)
  // const goodsInCart = undefined
  // if (localStorage.getItem('cartStateJewelryStore')) {
  const goodsInCart = JSON.parse(localStorage.getItem('cartStateJewelryStore') as string)
  console.log(goodsInCart)
  // }
  console.log(item)
  const productDetails = createEl('main', 'product-details')

  if (item) {
    const breadCrumb = createEl('div', 'breadcrumb')
    const breadCrumbList = createEl('ul', 'breadcrumb__list')
    const breadCrumbStore = createEl('li', 'breadcrumb__item', 'store')
    const breadCrumbCategory = createEl('li', 'breadcrumb__item', `${item.category}`)
    const breadCrumbCollection = createEl('li', 'breadcrumb__item', `${item.collection}`)
    const breadCrumbName = createEl('li', 'breadcrumb__item', `${item.name}`)
    breadCrumbList.appendChild(breadCrumbStore)
    breadCrumbList.appendChild(breadCrumbCategory)
    breadCrumbList.appendChild(breadCrumbCollection)
    breadCrumbList.appendChild(breadCrumbName)
    breadCrumb.appendChild(breadCrumbList)

    const goodSection = createEl('section', 'good')
    const imagesBlock = createEl('div', 'good__images')
    const previews = createEl('div', 'images__previews')
    const photo = createEl('img', 'images__photo')

 
    // if (photo instanceof HTMLImageElement && typeof good.img[0] === 'string') {
    if (photo instanceof HTMLImageElement) {

      // photo.src = require(`../../assets/img/webp/${id}.webp`)
      photo.setAttribute('src', item.img[0])
      // photo.setAttribute('src', './assets/image/01.webp')

    }
    item.img.forEach(el => {
      console.log(el)
      const img = createEl('img', 'images__previews-preview')
      img.setAttribute('src', el)
      previews.appendChild(img)
    });
    // if (photo instanceof HTMLImageElement) photo.src = require(`url(${good?.img[0]})`)
    // if (photo instanceof HTMLImageElement) photo.src = require(`${good?.img[0]}`)
    // photo.style.backgroundImage = require(good?.img[0] as string)
    const descriptionBlock = createEl('div', 'good__description')
    const name = createEl('h1', 'description__name', item.name)

    const rating = createEl('span', 'description__name', `${'★'.repeat(Number(item.rating)) + '☆'.repeat(5 - Number(item.rating))}`)

    const price = createEl('span', 'description__price', `$${item.price}`)
    const category = createEl('span', 'description__category', `category: ${item.category}`)
    const collection = createEl('span', 'description__collection', `collection: ${item.collection}`)

    const color = createEl('span', 'description__color', `color: ${item.color}`)
    const metal = createEl('span', 'description__metal', `metal: ${item.metal}`)
    const stock = createEl('span', 'description__stock', `stock: ${item.stock}`)
    
    const description = createEl('p', 'description__description', `${item.description}`)
    const btns = createEl('div', 'description__buttons')
    const btnAdd = createEl('button', 'button__add', 'Add to cart')
    if (goodsInCart) { 
      goodsInCart.forEach((goodInCart: { id: string; }) => {
        if (goodInCart.id === item.id) {
          btnAdd.classList.add('incart')
          btnAdd.textContent= 'Drop from cart'
        }
      })
    }
    const btnBuy = createEl('button', 'button__buy', 'Buy now')
    
    


    imagesBlock.appendChild(previews)
    imagesBlock.appendChild(photo)
    btns.appendChild(btnAdd)
    btns.appendChild(btnBuy)
    descriptionBlock.appendChild(name)
    descriptionBlock.appendChild(rating)
    descriptionBlock.appendChild(price)
    descriptionBlock.appendChild(category)
    descriptionBlock.appendChild(collection)
    

    descriptionBlock.appendChild(color)
    descriptionBlock.appendChild(metal)
    descriptionBlock.appendChild(stock)

    descriptionBlock.appendChild(description)
   

    descriptionBlock.appendChild(btns)


    goodSection.appendChild(imagesBlock)
    goodSection.appendChild(descriptionBlock)


    productDetails.appendChild(card)
    productDetails.appendChild(breadCrumb)
    productDetails.appendChild(goodSection)
    

  }
  return productDetails
}



