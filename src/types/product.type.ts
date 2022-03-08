export interface Product {
  id: string;
  name: string;
  prices: Price[];
}

export interface Price {
  id: string;
  price: string;
  date: string;
}