import { createEl } from "../../components/createEl";
import { goods } from "../../data/goods";
import { createURL } from "./createURL";
import { filteringGoods } from "./filteringGoods";
import { getFiltersParams } from "./getFiltersParams";
import { changeValueCheckboxFilter } from "./changeValueCheckboxFilter";
import { changeValueRangeFilter } from "./changeValueRangeFilter";

export function renderStoreFilters() {
  const storeFilters = createEl('div', 'store__filters')
  const drop = createEl('div', 'drop')
  const dropList = createEl('select', 'drop__list')
  const optionSelected = createEl('option', 'drop__option')
  optionSelected.setAttribute('selected', 'true')
  optionSelected.textContent = 'Sort by'
  dropList.appendChild(optionSelected)

  const filtersParams = getFiltersParams()
  const selectedSort = filtersParams.sort?.join('')
  const searchText = filtersParams.search?.join('')
  const selectedView = filtersParams.view?.join('')

  createDropListItem('Price-LtoH','Price: Low to High')
  createDropListItem('Price-HtoL', 'Price: High to Low')
  createDropListItem('Rating-LtoH','Rating: Low to High')
  createDropListItem('Rating-HtoL', 'Rating: High to Low')
  createDropListItem('Collection-AtoZ','Collection: A to Z')
  createDropListItem('Collection-ZtoA', 'Collection: Z to A')
  drop.appendChild(dropList)

  function createDropListItem(value: string, text: string) {

    const option = createEl('option', 'drop__option', text)
    option.setAttribute('value', value)
    if(selectedSort === value) option.setAttribute('selected', 'true')
    dropList.appendChild(option)
  }

  const foundBlock = createEl('div', 'found__block')
  const found = document.createElement('span')
  found.textContent = 'Found: '
  const arrGoodsId = Object.keys(filtersParams).length === 0 ? goods.map((good) => good.id) : filteringGoods()
  const foundCount = createEl('span', 'found__block-count', arrGoodsId.length.toString())
  foundBlock.appendChild(found)
  foundBlock.appendChild(foundCount)

  const headerSearch = createEl('div', 'search__block')
  const inputSearch = createEl('input', 'search__block-input')
  if (inputSearch instanceof HTMLInputElement) inputSearch.placeholder = 'Search'
  inputSearch.setAttribute('autofocus', 'true')
  inputSearch.setAttribute('autocomplete', 'off')
  if(searchText) inputSearch.setAttribute('value', searchText)
  const btnSearch = createEl('button', 'search__block-btn-search')
  if (inputSearch instanceof HTMLInputElement && inputSearch.value !== '') {
    btnSearch.style.backgroundImage = 'url(./assets/image/close.svg)'
  } else {
    btnSearch.style.backgroundImage = 'url(./assets/image/search.svg)'
  }
  // const btnRemove = createEl('button', 'search__block-btn-remove')
  headerSearch.appendChild(inputSearch)
  headerSearch.appendChild(btnSearch)
  // headerSearch.appendChild(btnRemove);

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
  if(selectedView==='small') inputBig.setAttribute('checked', 'false')
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
  if(selectedView ==='small') inputSmall.setAttribute('checked', 'true')
  viewBlock.appendChild(inputSmall)
  viewBlock.appendChild(labelSmall)
  
  storeFilters.appendChild(drop)
  storeFilters.appendChild(foundBlock)
  storeFilters.appendChild(headerSearch)
  storeFilters.appendChild(viewBlock)

  dropList.addEventListener('change', () => {
    if (dropList instanceof HTMLSelectElement) createURL('sort', dropList.value)
  })

  inputSearch.addEventListener('input', () => {
    if (inputSearch instanceof HTMLInputElement) {
      createURL('search', inputSearch.value)
      changeValueCheckboxFilter()
      changeValueRangeFilter()
      btnSearch.style.backgroundImage = 'url(./assets/image/close.svg)'}
  })

  btnSearch.addEventListener('click', () => {
    if (inputSearch instanceof HTMLInputElement && inputSearch.value !== '') {
      inputSearch.value = ''
      btnSearch.style.backgroundImage = 'url(./assets/image/search.svg)'
      createURL('search', inputSearch.value)
      changeValueCheckboxFilter()
      changeValueRangeFilter()
    }
  })

  viewBlock.addEventListener('click', (event) => {
    if (event.target instanceof HTMLInputElement) {
      const value = (event.target.id).split('-')[1]
      createURL('view', value)
    }
  })
  
  return storeFilters
}