import { createEl } from "../../components/createEl"
import { goods } from "../../data/goods"
import { ItemKey, Param } from "../../types/types"
import { createURL } from "./createURL"
import { filteringGoods } from "./filteringGoods"
import { getFiltersParams } from "./getFiltersParams"
import { getFromToValueOfRangeFilter } from "./getFromToValueOfRangeFilter"
import { changeValueCheckboxFilter } from "./changeValueCheckboxFilter"
import { changeValueRangeFilter } from "./changeValueRangeFilter"

export function renderRangeFilter(typeFilter: Param) {
  const filtersParams = getFiltersParams()
  // const filteredGoods = filteringGoods()
  const filteredGoods = Object.keys(filtersParams).length === 0 ? goods : filteringGoods()
  const filter = createEl('div', 'filters__range')
  const title = createEl('h4', 'filters__title' , typeFilter)
  filter.appendChild(title)

  function getMinMax() {
    const arrOfValue: number[] = []
    goods.forEach((good) => {
      arrOfValue.push(Number(good[typeFilter as ItemKey]))
    })
    const min = Math.min.apply(null, arrOfValue).toString()
    const max = Math.max.apply(null, arrOfValue).toString()

    return [min, max]
  }

  const [min, max] = getMinMax()
  const [from, to] = getFromToValueOfRangeFilter(typeFilter)

  const sliderWrapper = createEl('div', `range__wrapper`)
  const sliderMin = createEl('div', `range__control-min`)
  sliderMin.setAttribute('id', `${typeFilter}-min`)
  sliderMin.textContent = from

  const slider = createEl('div', `${typeFilter}__slider`)
  const sliderTrack = createEl('div', `${typeFilter}__slider-track`)
  const sliderInput = createEl('input', 'slider-input')

  sliderInput.setAttribute('type', 'range')
  sliderInput.setAttribute('id', `from-${typeFilter}`)
  sliderInput.setAttribute('min', min)
  sliderInput.setAttribute('max', max)
  sliderInput.setAttribute('value', from)

  const sliderInput1 = createEl('input', 'slider-input')
  sliderInput1.setAttribute('type', 'range')
  sliderInput1.setAttribute('id', `to-${typeFilter}`)
  sliderInput1.setAttribute('min', min)
  sliderInput1.setAttribute('max', max)
  sliderInput1.setAttribute('value', to)

  slider.appendChild(sliderTrack)
  slider.appendChild(sliderInput)
  slider.appendChild(sliderInput1)

  const sliderMax = createEl('div', `range__control-max`)
  sliderMax.setAttribute('id', `${typeFilter}-max`)
  sliderMax.textContent = to

  sliderWrapper.appendChild(sliderMin)
  sliderWrapper.appendChild(slider)
  sliderWrapper.appendChild(sliderMax)
  filter.appendChild(sliderWrapper)

  filter.addEventListener('input', (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      const value = event.target.value
      let from = '0'
      let to ='0'
      if (event.target.id === `from-${typeFilter}`) {
        from = value
        if (sliderInput1 instanceof HTMLInputElement) to = sliderInput1.value
        sliderMin.textContent = value
      }
      if (event.target.id === `to-${typeFilter}`) {
        if (sliderInput instanceof HTMLInputElement) from = sliderInput.value
        to = value
        sliderMax.textContent = value
      }
      createURL(typeFilter, `${from},${to}`)
      changeValueCheckboxFilter()
      changeValueRangeFilter()

    }
  })
  
  return filter
}