import { createEl } from "../../components/createEl";

export function renderStoreFilters() {
  const storeFilters = createEl('div', 'store__filters')
  const drop = createEl('div', 'drop')
  const dropList = createEl('select', 'drop__list')
  const optionSelected = createEl('option', 'drop__option')
  optionSelected.setAttribute('selected', 'true')
  optionSelected.textContent = 'Sort by'
  dropList.appendChild(optionSelected)

  createOption('Price-LtoH','Price: Low to High')
  createOption('Price-HtoL', 'Price: High to Low')
  createOption('Rating-LtoH','Rating: Low to High')
  createOption('Rating-HtoL', 'Rating: High to Low')
  createOption('Collection-AtoZ','Collection: A to Z')
  createOption('Collection-ZtoA', 'Collection: Z to A')
  drop.appendChild(dropList)

  function createOption(value: string, text: string) {
    const option = createEl('option', 'drop__option')
    option.setAttribute('value', value)
    option.textContent = text
    dropList.appendChild(option)
  }

  const foundBlock = createEl('div', 'found__block')
  const found = document.createElement('span')
  found.textContent = 'Found: '
  const foundCount = document.createElement('span')
  foundCount.textContent= `0`
  foundBlock.appendChild(found)
  foundBlock.appendChild(foundCount)

  const headerSearch = createEl('div', 'search__block')
  const inputSearch = createEl('input', 'search__block-input')
  if (inputSearch instanceof HTMLInputElement) inputSearch.placeholder = 'Search'
  inputSearch.setAttribute('autofocus', 'true')
  inputSearch.setAttribute('autocomplete', 'off')
  const btnSearch = createEl('button', 'search__block-btn-search')
  const btnRemove = createEl('button', 'search__block-btn-remove')
  headerSearch.appendChild(inputSearch)
  headerSearch.appendChild(btnSearch)
  headerSearch.appendChild(btnRemove);

  const viewBlock = createEl('div', 'view__block')
  const labelBig = createEl('label', 'view__label')
  labelBig.setAttribute('for', 'view-big')
  const urlBigImg = require('../../assets/img/png/squares4.png')
  labelBig.style.backgroundImage = `url(${urlBigImg})`
  const inputBig = createEl('input', `view__input`)
  inputBig.setAttribute('id', 'view-big')
  inputBig.setAttribute('type', 'radio')
  inputBig.setAttribute('name', 'view')
  inputBig.setAttribute('checked', 'true')
  viewBlock.appendChild(inputBig)
  viewBlock.appendChild(labelBig)

  const labelSmall = createEl('label', 'view__label')
  labelSmall.setAttribute('for', 'view-small')
  const urlSmallImg = require('../../assets/img/png/squares5.png')
  labelSmall.style.backgroundImage = `url(${urlSmallImg})`
  const inputSmall = createEl('input', `view__input`)
  inputSmall.setAttribute('id', 'view-small')
  inputSmall.setAttribute('type', 'radio')
  inputSmall.setAttribute('name', 'view')
  viewBlock.appendChild(inputSmall)
  viewBlock.appendChild(labelSmall)
  
  storeFilters.appendChild(drop)
  storeFilters.appendChild(foundBlock)
  storeFilters.appendChild(headerSearch)
  storeFilters.appendChild(viewBlock)
  return storeFilters
}