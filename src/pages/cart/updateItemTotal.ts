import {getState} from "./getState";
import {updateCartTotal} from "./updateCartTotal";
import {updateProductList} from "./updateProductList";

export const updateItemTotal = (e:Event) => {
  const state = getState();
  const target = <Element>e.target;
  const currentElement = target.closest('.cart__item');
  const item = state.find((el)=>el.id==currentElement?.id);

  if(item) {
    const currentCount = currentElement?.querySelector('.cart__controls-count');
    const currentTotal = currentElement?.querySelector('.cart__controls-total');

    if (target.classList.contains('cart__controls-decrement')) {

      if(item.count! > 1){
        item.count =  --item.count!
        currentCount!.textContent = `${item.count}`
        item.total = item.count!  * item.price
        currentTotal!.textContent = `Total: $${item.total}`
        localStorage.setItem('cartStateJewelryStore', JSON.stringify(state));
      }else{
        updateProductList(target.id, 0)
      }
    } else if (target.classList.contains('cart__controls-increment')) {
      item.count = item.count! < item.stock ? ++item.count! : item.count
      currentCount!.textContent = `${item.count}`
      item.total = item.count!  * item.price
      currentTotal!.textContent = `Total: $${item.total}`
      localStorage.setItem('cartStateJewelryStore', JSON.stringify(state));
    }

    updateCartTotal()
  }
}

