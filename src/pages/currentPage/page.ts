import { renderHeader } from "../../components/header/header";
import { renderWrapper } from "../../components/wrapper/wrapper";
import {routs} from "../../router/routs";
import {renderProductDetails} from "../product-details/renderProductDetails";

export function renderPage(name:string,id?:string) {
  document.body.replaceChildren()
  const wrapper = renderWrapper()
  document.body.appendChild(wrapper)
  const header = renderHeader()
  const page = id?renderProductDetails(id): routs[name]
  if(page){
    wrapper.appendChild(header)
    wrapper.appendChild(page)
  }

}