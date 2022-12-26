export function copyLink(event: Event) {
  const copyBtn = event.target
  if (copyBtn instanceof HTMLButtonElement) {
    const href = window.location.href.toString()
    navigator.clipboard.writeText(href)
    copyBtn.textContent = 'Copied!'
    copyBtn.style.backgroundColor = '#1A191F'
    copyBtn.style.color = '#FFFFFF'
    setTimeout(() => {
      copyBtn.textContent = 'Copy link'
      copyBtn.style.backgroundColor = ''
      copyBtn.style.color = ''
    }, 1000)
  }
}
