export interface Item {
  id: string;
  name: string;
  img: string[];
  collection: string;
  category: string;
  metal: string;
  rating: string;
  color: string;
  bestsellers: string;
  year: number;
  price: number;
  stock: number;
  description: string;
}

export interface FiltersParams {
  collection?: string[];
  category?: string[];
  price?: string[];
  stock?: string[];
  sort?: string[];
  search?: string[];
  view?: string[]
}

export type Param = keyof FiltersParams;
