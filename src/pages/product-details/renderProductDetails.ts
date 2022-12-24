import {createEl} from "../../components/createEl";

export const renderProductDetails = <T extends string | undefined>(id:T) => {
  const card = createEl('div', 'cart')
  card.innerHTML=`
    <h2>Product details</h2>
    <h2>id = ${id}</h2>
<h3 data-href="main" class="pages" style="cursor:pointer">Main page</h3>
`

  return card
}



