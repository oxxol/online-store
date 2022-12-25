import { createEl } from "../../components/createEl";
import { renderStoreFilters } from "./renderStoreFilters";
import { renderStoreGoods } from "./renderStoreGoods";

export function renderStoreSection() {
  const store = createEl('section', 'store')
  const storeFilters = renderStoreFilters()
  const storeGoods = renderStoreGoods()
  
  store.appendChild(storeFilters)
  store.appendChild(storeGoods)
  
  return store
}