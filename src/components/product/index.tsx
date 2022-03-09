import React from 'react';
import { Link } from 'react-router-dom';
import {Price, Product} from "../../types/product.type";
import {useAppDispatch} from "../hooks";
import {removeProduct} from "../../redux/reducers";


interface Props {
  product: Product
}

export const getPrices = (prices: Price[]) => {
  if(prices.length > 1){
    const convertedPriceDates = prices.map((price) => ({...price, date: new Date(price.date)}))
      .sort((price1, price2) => {
        // @ts-ignore
        return price2.date - price1.date
      })

    return [convertedPriceDates[0], convertedPriceDates[1]]
  }
  return [prices[0]]

}


const ProductComponent = ({product}: Props) => {

  const dispatch = useAppDispatch()

  const price = getPrices(product.prices)

  return (
    <div className="relative bg-white shadow-md shadow-slate-200 py-4 px-4 space-y-1 rounded">
      <Link to={`/edit/${product.id}`} className="inline-block absolute -top-3 border bg-white h-8 w-8 -left-2 rounded-full flex items-center justify-center shadow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </Link>

      <div
        onClick={() => dispatch(removeProduct(product))}
        className="cursor-pointer absolute -top-3 border bg-white h-8 w-8 -right-2 rounded-full flex items-center justify-center shadow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <div className="text-base text-center font-semibold text-gray-700">{product?.name}</div>
      <div className="flex items-center space-x-2 justify-center">
        {
          price.length > 1 && ( <div className="text-sm font-medium line-through text-gray-500">GH¢ {(+price[1].price).toFixed(2)}</div>)
        }

        <div>GH¢ {(+price[0].price).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductComponent;