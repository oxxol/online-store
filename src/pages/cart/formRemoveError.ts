export function formRemoveError(input: HTMLInputElement) {
  if (input instanceof HTMLInputElement && input.parentElement) {
    const errorMessage = input.parentElement.querySelector('.modal__form-error')
    input.classList.remove('_error')
    if (errorMessage) {
      input.parentElement.removeChild(errorMessage)
    }
  }
}