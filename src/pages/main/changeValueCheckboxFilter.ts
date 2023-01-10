import { getCountFoundGoodsByFilter } from "./getCountFoundGoodsByFilter";

export function changeValueCheckboxFilter() {
  const forms = document.querySelectorAll('.checkbox__form')
  forms.forEach((form) => {
    const typeFilter = form.getAttribute('id')?.split('-')[0]
    const value = form.getAttribute('id')?.split('-')[1].toLowerCase()
    if (typeFilter !== undefined && value !==undefined) {
      const count = getCountFoundGoodsByFilter(typeFilter, value)
      const countFound = document.getElementById(`found-${value}`)
      if (countFound instanceof HTMLElement && form instanceof HTMLElement) {
        countFound.textContent = count.toString()
        form.style.color = '#222222'
      }   
      if (form instanceof HTMLElement && count === 0) form.style.color = '#AAA9A9'
    }
  })
}