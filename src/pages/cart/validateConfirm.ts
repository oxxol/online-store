import { formAddError } from "./formAddError";
import { formRemoveError } from "./formRemoveError";
import { validateInput } from "./validateInput";
import {renderPurchaseMessage} from "./renderPurchaseMessage";

export function validateConfirm() {
  const inputs = document.body.querySelectorAll('.modal__form-input');
  let isValid = true;

  inputs.forEach((input) => {

    if (input instanceof HTMLInputElement) {
      formRemoveError(input);

      if (validateInput(input) === false) {
        isValid = false;
        formAddError(input);
      }
    }

  })

  if (isValid) {
    renderPurchaseMessage()
  }
}

