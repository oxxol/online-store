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
    } else if ((<Element>e.target).closest('.open-item-details-page')) {
      if (!(<Element>e.target).classList.contains('card__button-add')){
        const path = 'product-details'
        let itemCardId: Element | null | string = (<Element>e.target).closest('div[id]')
        if (itemCardId !== null) {
          itemCardId = (itemCardId.id).split('-')[0]
          locationHandler(path, itemCardId)
        }
      }
    }
  })
  
  window.addEventListener('popstate', () => {
    locationHandler()
  });
}



