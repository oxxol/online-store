import { createEl } from "../../components/createEl"
import { renderFilters } from "./renderFilters"
import { renderStoreSection } from "./renderStoreSection"

export function renderMain() {
  const main = createEl('main', 'main')
  const filters = renderFilters()
  const store = renderStoreSection()
  main.append(filters)
  main.append(store)
  return main
}
