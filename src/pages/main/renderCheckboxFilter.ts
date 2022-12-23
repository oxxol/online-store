import { createEl } from "../../components/createEl"
import { goods } from "../../data/goods"
import { Item, Param } from "../../types/types"
import { createURL } from "./createURL"

export function renderCheckboxFilter(arr: string[], typeFilter: Param) {
  const filter = createEl('div', `filters__checkbox`)
  const title = createEl('h4', `filters__title`)
  title.textContent = typeFilter
  filter.appendChild(title)

  arr.forEach((el: string) => {
    const form = createEl('div', `checkbox__form`)
    const label = createEl('label', `checkbox__label`)
    label.setAttribute('for', `inp-${el.toLowerCase()}`)
    label.setAttribute('id', `${typeFilter}-${el.toLowerCase()}`)
    label.textContent = el
    const input = createEl('input', `checkbox__input`)
    input.setAttribute('id', `inp-${el.toLowerCase()}`)
    input.setAttribute('type', 'checkbox')
    const foundBlock = createEl('div', `checkbox__block-found`)
    const countAll = goods.reduce((acc: number, item: Item) => {
      if (typeFilter in item && item[typeFilter as keyof Item] === el) {
        acc++
      }
      return acc
    }, 0);

    const foundGoods = createEl('span', 'checkbox__block_found-goods', '0')
    foundGoods.setAttribute('id', 'found-goods')
    const slash = createEl('span', 'slash', '/')
    const allGoods = createEl('span', 'checkbox__block_all-goods', `${countAll}`)
    
    foundBlock.appendChild(foundGoods)
    foundBlock.appendChild(slash)
    foundBlock.appendChild(allGoods)

    form.appendChild(input)
    form.appendChild(label)
    form.appendChild(foundBlock)
    filter.appendChild(form)
  })
  filter.addEventListener('click', (event: Event) => {
    if (event.target instanceof HTMLLabelElement) {
      const value = (event.target.id).split('-')[1]
      createURL(typeFilter, value)
    }
  })
  return filter;
}
