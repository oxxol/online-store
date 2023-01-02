import { createEl } from "../../components/createEl"
import { goods } from "../../data/goods"
import { ItemKey, Param } from "../../types/types"
import { createURL } from "./createURL"
import { getFromToValueOfRangeFilter } from "./getFromToValueOfRangeFilter"
import { changeValueCheckboxFilter } from "./changeValueCheckboxFilter"
import { changeValueRangeFilter } from "./changeValueRangeFilter"
import { getFiltersParams } from "./getFiltersParams"
import { filteringGoods } from "./filteringGoods"

export function renderRangeFilter(typeFilter: Param) {
  const filtersParams = getFiltersParams()
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
  const sliderInputFrom = createEl('input', 'slider-input')

  sliderInputFrom.setAttribute('type', 'range')
  sliderInputFrom.setAttribute('id', `from-${typeFilter}`)
  sliderInputFrom.setAttribute('min', min)
  sliderInputFrom.setAttribute('max', max)
  sliderInputFrom.setAttribute('value', from)

  const sliderInputTo = createEl('input', 'slider-input')
  sliderInputTo.setAttribute('type', 'range')
  sliderInputTo.setAttribute('id', `to-${typeFilter}`)
  sliderInputTo.setAttribute('min', min)
  sliderInputTo.setAttribute('max', max)
  sliderInputTo.setAttribute('value', to)

  slider.appendChild(sliderTrack)
  slider.appendChild(sliderInputFrom)
  slider.appendChild(sliderInputTo)

  const sliderMax = createEl('div', `range__control-max`)
  sliderMax.setAttribute('id', `${typeFilter}-max`)
  sliderMax.textContent = to

  sliderWrapper.appendChild(sliderMin)
  sliderWrapper.appendChild(slider)
  sliderWrapper.appendChild(sliderMax)
  filter.appendChild(sliderWrapper)

  filter.addEventListener('change', (event: Event) => {
    if (event.target instanceof HTMLInputElement && sliderInputTo instanceof HTMLInputElement && sliderInputFrom instanceof HTMLInputElement) {
      let from = '0'
      let to ='0'
      if (event.target.id === `from-${typeFilter}`) {
        from = event.target.value
        to = sliderInputTo.value     
      } else if (event.target.id === `to-${typeFilter}`) {
        from = sliderInputFrom.value
        to = event.target.value
      }
   
      if (Number(from) > Number(to)) {
        [from, to] =[to,from]
      }

      sliderMin.textContent = from
      sliderMax.textContent = to

      createURL(typeFilter, `${from},${to}`)
      changeValueCheckboxFilter()
      changeValueRangeFilter()
    }
  })
  
  return filter
}