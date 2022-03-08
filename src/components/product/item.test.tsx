import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductComponent from "./index";

test('renders learn react link', () => {
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
        }
      ]
    };

  render(<ProductComponent product={product} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
