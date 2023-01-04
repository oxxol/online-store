export function validateInput(input: HTMLInputElement) {

  if (input instanceof HTMLInputElement) {

    if (input.classList.contains('_personal-name')) {
      const regex = input.value.match(/[a-zA-Z]{3,}(\s[a-zA-Z]{3,})+/)
      if (regex) return true
      return false
    }

    if (input.classList.contains('_personal-phone')) {
      const regex = input.value.match(/^[+][\d]{9,}$/)
      if (regex) return true
      return false
    }

    if (input.classList.contains('_personal-address')) {
      const regex = input.value.match(/[a-zA-Z]{5,}(\s[a-zA-Z]{5,})(\s[a-zA-Z]{5,})+/)
      if (regex) return true
      return false
    }

    if (input.classList.contains('_personal-email')) {
      const regex = input.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (regex) return true
      return false
    }

    if (input.classList.contains('_card-number')) {
      const number = input.value.replace(/\s/g, '')
      if (number.length === 16) return true;
      return false
    }
    if (input.classList.contains('_card-valid')) {
      const arr = input.value.split('/')
      if (Number(arr[0]) < 13 && arr[0].length === 2 && Number(arr[1]) > 22 && arr[1].length === 2) {
        return true
      } else {
        return false
      } 
    }

    if (input.classList.contains('_card-cvv')) {
      if (input.value.length === 3) return true
      return false
    }
  }
}
