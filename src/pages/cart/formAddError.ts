import { createEl } from "../../components/createEl"

export function formAddError(input: HTMLInputElement) {
  const errorMessage = createEl('span', 'modal__form-error', 'error')
  if (input instanceof HTMLInputElement && input.parentElement) {
    input.parentElement.appendChild(errorMessage)
    input.classList.add('_error')
  }
}