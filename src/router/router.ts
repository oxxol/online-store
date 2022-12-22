import { renderPage } from "../pages/currentPage/page";

export const router = () => {

  window.addEventListener("hashchange",()=> {
    let hash = window.location.hash.slice(1)
    locationHandler(hash)
  });
  locationHandler()
  window.addEventListener('click', (e) => {
    if ((<Element>e.target).classList.contains('pages')) {
      e.preventDefault()
      const path = (<HTMLLinkElement>e.target).dataset.href
      locationHandler(path)
    }else if ((<Element>e.target).classList.contains('card__button-details')){
      const path ='product-details'
      locationHandler(path,(<Element>e.target).id)
    }
  })
}

function locationHandler (path?:string,id?:string)  {
  let location = window.location.hash.replace("#", "");
  if (location.length == 0) {
    location = "/";
  }
  if(path){
    location = path
    window.history.pushState({}, "", id?`#${path}/${id}`:`#${path}`);
  }
  id?renderPage(location,id):renderPage(location)
};

