import locationHandler from "./locationHandler";

export const router = () => {

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1)
    locationHandler(hash)
  });
  locationHandler()
  window.addEventListener('click', (e) => {
    if ((<Element>e.target).classList.contains('pages')) {
      e.preventDefault()
      const path = (<HTMLLinkElement>e.target).dataset.href
      locationHandler(path)
    } else if ((<Element>e.target).classList.contains('card__button-details')) {
      const path = 'product-details'
      locationHandler(path, (<Element>e.target).id)
    }
  })
}



