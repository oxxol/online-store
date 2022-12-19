import { renderHeader } from "../../components/header/header";
import { renderWrapper } from "../../components/wrapper/wrapper";
import { renderMain } from "../main/renderMain";

export function renderPage() {
  const wrapper = renderWrapper()
  document.body.appendChild(wrapper)
  const header = renderHeader()
  const main = renderMain()

  wrapper.appendChild(header)
  wrapper.appendChild(main)

}