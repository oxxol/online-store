import { createEl } from "../createEl"

export function renderFooter() {
  const footer = createEl('footer', 'footer')

  const linksBlock = createEl('div', 'footer__links-block')
  const link1 = createEl('a', 'footer__link','GitHub/KalmykovaElena')
  link1.setAttribute('href', 'https://github.com/KalmykovaElena')
  const link2 = createEl('a', 'footer__link','GitHub/oxxol')
  link2.setAttribute('href', 'https://github.com/oxxol')

  const year = createEl('span', 'footer-year', '© 2023')

  const linkRSSchool = createEl('a', 'footer__link-RS')
  linkRSSchool.setAttribute('href', 'https://rs.school/js/')

  linksBlock.appendChild(link1)
  linksBlock.appendChild(link2)
  footer.appendChild(linksBlock)
  footer.appendChild(year)
  footer.appendChild(linkRSSchool)

  
  return footer
}