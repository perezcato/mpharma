import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductComponent, { getPrices} from "../components/product";

test('Property component is rendered on page', () => {

  const product = {
      "id": 1,
      "name": "Exforge 10mg",
      "prices": [
        {
          "id": 1,
          "price": 10.99,
          "date": "2019-01-01T17:16:32+00:00"
        },
        {
          "id": 2,
          "price": 9.20,
          "date": "2018-11-01T17:16:32+00:00"
        },
        {
          "id": 3,
          "price": 15.20,
          "date": "2017-11-01T17:16:32+00:00"
        }
      ]
    };

  render(<ProductComponent product={product} />);

  const price = getPrices(product.prices)

  const productName = screen.getByText(`${product.name}`);
  const oldPrice1 = screen.getByText(`GH¢ ${+price[1].price}`);
  const recentPrice = screen.getByText(`GH¢ ${+price[0].price}`);

  expect(productName).toBeInTheDocument();
  expect(oldPrice1).toBeInTheDocument();
  expect(oldPrice1).toHaveClass('line-through');
  expect(recentPrice).toBeInTheDocument();
});
