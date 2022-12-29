import {createEl} from "../../components/createEl";

export const renderErrorPage = () => {

  const errorPage = createEl('main', 'error__page')
  const errorInfo = createEl('h2', 'error__page-info','404 Page Not Found')
  const errorDescription = createEl('h2', 'error__page-description','Oops, sorry! This page does not exist.')
  const homeButton = createEl('button', 'homeButton','Continue shopping')
  homeButton.classList.add('pages')
  homeButton.setAttribute('data-href','main')
  errorPage.appendChild(errorInfo)
  errorPage.appendChild(errorDescription)
  errorPage.appendChild(homeButton)

  return errorPage
}
