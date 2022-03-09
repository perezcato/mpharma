import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import user from '@testing-library/user-event'
import Create from '../page/create';
import {store} from "../redux/store";
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom";

test('it Should render the basic test fields and can submit form', async () => {

  render(
    <BrowserRouter>
      <Provider store={store}>
        <Create />
      </Provider>
    </BrowserRouter>
  )

  const nameInput = screen.getByTestId("name")
  const valueInput = screen.getByTestId("price")
  const button = screen.getByTestId("submit")

  expect(nameInput).toBeInTheDocument()
  expect(valueInput).toBeInTheDocument()
  expect(button).toBeInTheDocument()

  user.type(nameInput, 'Trasilicate')
  user.type(valueInput, '15.23')
  fireEvent.submit(button)

  window.alert = jest.fn();

  await waitFor(() => window.alert())
})