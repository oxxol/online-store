import { createEl } from "../../components/createEl"
import { Param } from "../../types/types"
import { createURL } from "./createURL"

export function renderRangeFilter(min: string, max: string, typeFilter: Param) {
  const filter = createEl('div', 'filters__range')
  const title = createEl('h4', 'filters__title')
  title.textContent = typeFilter
  filter.appendChild(title)

  const sliderWrapper = createEl('div', `range__wrapper`)
  const sliderMin = createEl('div', `range__control-min`)
  sliderMin.textContent = min

  const slider = createEl('div', `${typeFilter}__slider`)
  const sliderTrack = createEl('div', `${typeFilter}__slider-track`)
  const sliderInput = createEl('input', `${typeFilter}__slider-input`)

  sliderInput.setAttribute('type', 'range')
  sliderInput.setAttribute('id', `from-${typeFilter}`)
  sliderInput.setAttribute('min', min)
  sliderInput.setAttribute('max', max)
  sliderInput.setAttribute('value', min)
  

  const sliderInput1 = createEl('input', `${typeFilter}__slider-input1`)
  sliderInput1.setAttribute('type', 'range')
  sliderInput1.setAttribute('id', `to-${typeFilter}`)
  sliderInput1.setAttribute('min', min)
  sliderInput1.setAttribute('max', max)
  sliderInput1.setAttribute('value', max)

  slider.appendChild(sliderTrack)
  slider.appendChild(sliderInput)
  slider.appendChild(sliderInput1)

  const sliderMax = createEl('div', `range__control-max`)
  sliderMax.textContent = max

  sliderWrapper.appendChild(sliderMin)
  sliderWrapper.appendChild(slider)
  sliderWrapper.appendChild(sliderMax)
  filter.appendChild(sliderWrapper)
  filter.addEventListener('input', (event: Event) => {
    
    if (event.target instanceof HTMLInputElement) {
      const value = event.target.value

      if (event.target.id === `from-${typeFilter}`) {
        const from = value
        const to = (sliderInput1 as HTMLInputElement).value
        sliderMin.textContent = value
        createURL(typeFilter, `${from},${to}`)
      }
      if (event.target.id === `to-${typeFilter}`) {
        const from = (sliderInput as HTMLInputElement).value
        const to = value
        sliderMax.textContent = value
        createURL(typeFilter, `${from},${to}`)

      }
    }
  })
  return filter
}