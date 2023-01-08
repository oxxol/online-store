import {createEl} from "../../components/createEl";
import {updateProductList} from "./updateProductList";
import locationHandler from "../../router/locationHandler";

export const renderPurchaseMessage = () => {
  const overlay = document.querySelector('.overlay');
  const cart = document.querySelector('.cart-wrapper');
  let time =3;
  const cartMessage = createEl('div', 'cart__purchase-message',`Thanks for your order. Redirect to the store after ${time} sec`);
  const timerId =setInterval(()=>{
    time--
    cartMessage.textContent=`Thanks for your order. Redirect to the store after ${time} sec`

    if(time<=0){
      clearInterval(timerId)
      locationHandler('main')
    }

  },1000)

  if(overlay) {
    document.body.removeChild(overlay)
  }

  localStorage.removeItem('cartStateJewelryStore')
  updateProductList('0',0)
  cart?.replaceChildren()
  cart?.appendChild(cartMessage)

}
