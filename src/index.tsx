import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import {store} from './redux/store'
import {fetchProducts, ProductState} from "./redux/reducers";
import {persistStore} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';

const localStore = localStorage.getItem('persist:root')

if(localStore) {
  const state = JSON.parse(localStore)
  if(state && state.products){
    const productsState = JSON.parse(state.products) as ProductState
    if(!productsState || !productsState.initialLoaded){
      store.dispatch(fetchProducts())
    }
  }else{
    store.dispatch(fetchProducts())
  }
} else {
  store.dispatch(fetchProducts())
}


let persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
