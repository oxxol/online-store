import { formAddError } from "./formAddError";
import { formRemoveError } from "./formRemoveError";
import { validateInput } from "./validateInput";

export function validateConfirm() {
  const inputs = document.body.querySelectorAll('.modal__form-input')
  let isValid = true;
  inputs.forEach((input) => {
    if (input instanceof HTMLInputElement) {
      formRemoveError(input)
      if (validateInput(input) === false) {        
        isValid = false
        formAddError(input)
      }
    }
  })
  if (isValid) console.log('Thanks for your order. Redirect to the store after 1 sec', isValid)
}


