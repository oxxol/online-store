import { formAddError } from "./formAddError"
import { formRemoveError } from "./formRemoveError"
import { validateInput } from "./validateInput"

export function formValidate(form: HTMLFormElement) {
  const reqPerson = form.querySelectorAll('._req-personal')

  reqPerson.forEach((input) => {
    if (input instanceof HTMLInputElement) {
      input.addEventListener('change', () => {
        formRemoveError(input)
        if (validateInput(input) === false) {
          formAddError(input)
        } else {
          formRemoveError(input)
        }      
      })
    }
  })

  const reqCard = form.querySelectorAll('._req-card')
  const cardImg = form.querySelector('.modal__form-card-img')

  reqCard.forEach((input) => {
    if (input instanceof HTMLInputElement && cardImg instanceof HTMLImageElement) {
      let hasSlash = false
      
      input.addEventListener('input', () => {

        if (input.classList.contains('_card-number')) {
          if (input.value[0] === '4') {
            cardImg.setAttribute('src', './assets/image/visa.svg')
          } else if (input.value[0] === '5') {
            cardImg.setAttribute('src', './assets/image/mastercard.svg')
          } else if (Number(input.value[0]) || input.value[0] === '0') {
            cardImg.setAttribute('src', './assets/image/google-pay.svg')
          } else {
            cardImg.setAttribute('src', './assets/image/card-payment.svg')
          }
          input.value = input.value
            .replace(/(\d{4})(?!\s|$)/gm, `$1 `)
            .match(/(?:\d{4} ?){0,3}(?:\d{0,4})?/)?.slice(0, 19).toString() as string
        }

        if (input.classList.contains('_card-valid')) {
          formRemoveError(input)
          input.value = input.value.replace(/(\d{2})(\d{2})/, "$ 1/$2").slice(0, 5)
          if(input.value.length < 2) hasSlash = false
          if (input.value.length === 2 && hasSlash === false) {
            if (Number(input.value) <= 12) {
              input.value += '/'
              formRemoveError(input)
              hasSlash=true
            } else {
              input.value += '/'
              formAddError(input)
              hasSlash=true
            }
          }
          if (input.value.length===5){
            if(Number(input.value.split('/')[1]) < 23) formAddError(input)
          }
        }

        if (input.classList.contains('_card-cvv')) {
          formRemoveError(input)
          input.value = input.value.slice(0, 3)        
        }        
      })

      input.addEventListener('change', () => {
        formRemoveError(input)
        if (validateInput(input) === false) {
          formAddError(input)
        } else {
          formRemoveError(input)
        }
      })
    }
  })
}