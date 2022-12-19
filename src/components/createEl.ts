export function createEl(tagName: string, className: string, text?: string) {
  const el = document.createElement(tagName)
  el.classList.add(className)
  if (text) el.textContent = text
  return el
}


