import { createEl } from "../../components/createEl"
import { goods } from "../../data/goods"
import { Item, Param } from "../../types/types"
import { createURL } from "./createURL"
import { getCountFoundGoodsByFilter } from "./getCountFoundGoodsByFilter"
import { getFiltersParams } from "./getFiltersParams"
import { changeValueCheckboxFilter } from "./changeValueCheckboxFilter"
import { changeValueRangeFilter } from "./changeValueRangeFilter"

export function renderCheckboxFilter(arr: string[], typeFilter: Param) {
  const filtersParams = getFiltersParams()
  const filter = createEl('div', `filters__checkbox`)
  const title = createEl('h4', `filters__title`)
  title.textContent = typeFilter
  filter.appendChild(title)
  
  arr.forEach((filterValue: string) => {
    const form = createEl('div', `checkbox__form`)
    form.setAttribute('id', `${typeFilter}-${filterValue.toLowerCase()}`)
    const label = createEl('label', `checkbox__label`)
    label.setAttribute('for', `inp-${filterValue.toLowerCase()}`)
    label.setAttribute('id', `label-${filterValue.toLowerCase()}`)
    label.textContent = filterValue
    const input = createEl('input', `checkbox__input`)
    input.setAttribute('id', `inp-${filterValue.toLowerCase()}`)
    input.setAttribute('type', 'checkbox')
    if(filtersParams[typeFilter]?.includes(filterValue.toLowerCase())) input.setAttribute('checked','true')
    const foundBlock = createEl('div', `checkbox__block-found`)
    
    const countAll = goods.reduce((acc: number, item: Item) => {
      if (typeFilter in item && item[typeFilter as keyof Item] === filterValue) {
        acc++
      }

      return acc
    }, 0);
    const count = getCountFoundGoodsByFilter(typeFilter, filterValue.toLowerCase())
    form.style.color = count === 0 ? '#AAA9A9' : '#222222'
    const foundGoods = createEl('span', 'checkbox__block_found-goods', `${count}`)
    foundGoods.setAttribute('id', `found-${filterValue.toLowerCase()}`)
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
      changeValueCheckboxFilter()
      changeValueRangeFilter()

    }
  })

  return filter;
}
