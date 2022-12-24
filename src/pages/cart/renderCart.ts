import {createEl} from "../../components/createEl";
let a =1
export function renderCart() {
  const cart = createEl('div', 'cart')
  cart.innerHTML = `
    <h2>Cart</h2>
<h3 data-href="main" class="pages" style="cursor:pointer">Main page</h3>
<h2>${a}</h2>
`
  return cart
}