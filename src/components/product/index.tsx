import React from 'react';
import {Price, Product} from "../../types/product.type";


interface Props {
  product: Product
}

export const getPrices = (prices: Price[]) => {
  const convertedPriceDates = prices.map((price) => ({...price, date: new Date(price.date)}))
    .sort((price1, price2) => {
      // @ts-ignore
      return price2.date - price1.date
    })

  return [convertedPriceDates[0], convertedPriceDates[1]]
}


const ProductComponent = ({product}: Props) => {

  const price = getPrices(product.prices)

  return (
    <div className="bg-white shadow-md shadow-slate-200 py-4 px-4 space-y-1 rounded">
      <div className="text-base text-center font-semibold text-gray-700">{product?.name}</div>
      <div className="flex items-center space-x-2 justify-center">
        <div className="text-sm font-medium line-through text-gray-500">GH¢ {+price[1].price}
        </div>
        <div>GH¢ {+price[0].price}</div>
      </div>
    </div>
  );
};

export default ProductComponent;