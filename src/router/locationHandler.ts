import {renderPage} from "../pages/currentPage/page";

function locationHandler(path?: string, id?: string) {
  let currentId = id
  let location = window.location.hash
  location=location.replace("#", "");

  if (location.length == 0) {
    location = "/";
  }

  if (path) {
    location = path
  }

  if (location.split('?')[0] === 'product-details') {
    currentId = id ? id : location.split('?')[1]
    location = 'product-details'
  }

  currentId? renderPage(location,currentId): renderPage(location)
  window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
  window.history.pushState(window.history.state, "", currentId ? `#${location}?${currentId}` :location=='/'?'': `#${location}`);
}

export default locationHandler