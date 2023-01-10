import { createEl } from "../../components/createEl"
import { copyLink } from "./copyLink"
import { renderCheckboxFilter } from "./renderCheckboxFilter"
import { renderRangeFilter } from "./renderRangeFilter"

export function renderFilters() {

  const filters = createEl('section', 'filters')
  const filtersBtns = createEl('div', 'filters__buttons')
  const resetBtn = createEl('button', 'filters__buttons-btn-reset', 'Reset filters')
  resetBtn.addEventListener('click', () => window.location.search = '')

  const copyBtn = createEl('button', 'filters__buttons-btn-copy', 'Copy link')
  copyBtn.addEventListener('click', (event) =>copyLink(event) )

  filtersBtns.appendChild(resetBtn)
  filtersBtns.appendChild(copyBtn)

  const filterCollection = renderCheckboxFilter(['Holiday', 'Luxe', 'Pearls', 'Florals', 'Everyday'], 'collection')
  const filterCategory =  renderCheckboxFilter(['earrings', 'bracelet', 'necklace'], 'category')
  const filterPrice = renderRangeFilter('price')
  const filterStock = renderRangeFilter('stock')

  filters.appendChild(filtersBtns)
  filters.appendChild(filterCategory)
  filters.appendChild(filterCollection)
  filters.appendChild(filterPrice)
  filters.appendChild(filterStock)
  
  return filters
}