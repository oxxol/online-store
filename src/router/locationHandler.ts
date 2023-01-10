import {renderPage} from "../pages/currentPage/page";

function locationHandler(path?: string, id?: string) {
  let location = window.location.hash.replace("#", "");

  if (location.length == 0) {
    location = "/";
  }
  if (path) {
    location = path
    window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
    window.history.pushState({}, "", id ? `#${path}/${id}` : `#${path}`);
  }
  if (location.split('/')[0] === 'product-details') {
    id ? renderPage(location, id) : renderPage(location.split('/')[0], location.split('/')[1])
  } else {
    renderPage(location)
  }

}
export default locationHandler