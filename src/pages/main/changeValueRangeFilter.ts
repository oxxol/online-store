import { Param } from "../../types/types"
import { getFromToValueOfRangeFilter } from "./getFromToValueOfRangeFilter"

export function changeValueRangeFilter() {
  const sliderInputs = document.querySelectorAll('.slider-input')
  sliderInputs.forEach((input) => {
    const typeFilter = input.getAttribute('id')?.split('-')[1] as Param
    const value = input.getAttribute('id')?.split('-')[0].toLowerCase()

    if (typeFilter !== undefined && value !== undefined && input instanceof HTMLInputElement) {
      const [from,to] = getFromToValueOfRangeFilter(typeFilter)
      if (value === 'from') input.value = from.toString()
      if (value === 'to') input.value = to.toString()

      const sliderMin = document.getElementById(`${typeFilter}-min`)
      if (sliderMin instanceof HTMLDivElement) sliderMin.textContent = from
      const sliderMax = document.getElementById(`${typeFilter}-max`)
      if (sliderMax instanceof HTMLDivElement) sliderMax.textContent=to
    }
  })
}