import React from 'react';
import { render, screen } from '@testing-library/react';
import { getPrices} from "../components/product";
import {store} from "../redux/store";
import {MemoryRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import App from "../App";
import {addProduct} from "../redux/reducers";

test('Can route to the home page', () => {

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

  store.dispatch(addProduct(product))

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const price = getPrices(product.prices)

  const productName = screen.getByText(`${product.name}`);
  const oldPrice1 = screen.getByText(`GH¢ ${(+price[1].price).toFixed(2)}`);
  const recentPrice = screen.getByText(`GH¢ ${(+price[0].price).toFixed(2)}`);

  expect(productName).toBeInTheDocument();
  expect(oldPrice1).toBeInTheDocument();
  expect(oldPrice1).toHaveClass('line-through');
  expect(recentPrice).toBeInTheDocument();
});

test('Can route to the create page', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/create']}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const nameInput = screen.getByTestId("name")
  const valueInput = screen.getByTestId("price")
  const button = screen.getByTestId("submit")

  expect(nameInput).toBeInTheDocument()
  expect(valueInput).toBeInTheDocument()
  expect(button).toBeInTheDocument()
});

test('Can route to the edit page', () => {

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

  store.dispatch(addProduct(product))

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/edit/1']}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const price = getPrices(product.prices)

  const productName = screen.getByDisplayValue(`${product.name}`);
  const recentPrice = screen.getByDisplayValue(`${(+price[0].price)}`);

  expect(productName).toBeInTheDocument();
  expect(recentPrice).toBeInTheDocument();
});
