export interface Product {
  id: number | string;
  name: string;
  prices: Price[];
}

export interface Price {
  id: string | number;
  price: string | number;
  date: string | Date;
}