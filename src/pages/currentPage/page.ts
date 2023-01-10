import { renderFooter } from "../../components/footer/footer";
import { renderHeader } from "../../components/header/header";
import { renderWrapper } from "../../components/wrapper/wrapper";
import {routs} from "../../router/routs";
import {goods} from "../../data/goods";

export function renderPage(name:string,id?:string) {

  document.body.replaceChildren()
  const wrapper = renderWrapper()
  document.body.appendChild(wrapper)
  const header = renderHeader()
  const footer = renderFooter()
  if(!routs[name] || id && !goods.find(item=>item.id===id)) name='**'
  const page = routs[name]
  if (page) {
    wrapper.appendChild(header)
    wrapper.appendChild(page(id))
    wrapper.appendChild(footer)   
  }
}
