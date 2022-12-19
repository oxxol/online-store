import { createEl } from "../../components/createEl"
import { renderCheckboxFilter } from "./renderCheckboxFilter"
import { renderRangeFilter } from "./renderRangeFilter"

export function renderFilters() {
  const filters = createEl('section', 'filters')
  const filtersBtns = createEl('div', 'filters__buttons')
  const resetBtn = createEl('button', 'filters__buttons-btn-reset')
  resetBtn.textContent = 'Reset filters'
  const copyBtn = createEl('button', 'filters__buttons-btn-copy')
  copyBtn.textContent = 'Copy link'
  filtersBtns.appendChild(resetBtn)
  filtersBtns.appendChild(copyBtn)

  const filterBrand = renderCheckboxFilter(['Holiday', 'Luxe', 'Pearls', 'Florals', 'Everyday'], 'collection')
  const filterCategory =  renderCheckboxFilter(['earrings', 'bracelet', 'necklace'], 'category')
  const filterPrice = renderRangeFilter('45','172','price')
  const filterStock = renderRangeFilter('0','100','stock')

  filters.appendChild(filtersBtns)
  filters.append(filterBrand)
  filters.appendChild(filterCategory)
  filters.appendChild(filterPrice)
  filters.appendChild(filterStock)
  return filters
}