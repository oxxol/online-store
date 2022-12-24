import {renderHeader} from "../../components/header/header";
import {renderWrapper} from "../../components/wrapper/wrapper";
import {routs} from "../../router/routs";

export function renderPage(name: string, id?: string) {
    document.body.replaceChildren()
    const wrapper = renderWrapper()
    document.body.appendChild(wrapper)
    const header = renderHeader()
    const page = routs[name]
    if (page) {
        wrapper.appendChild(header)
        wrapper.appendChild(page(id))
    }
}