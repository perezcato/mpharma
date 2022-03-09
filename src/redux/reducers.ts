import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../types/product.type";

export interface ProductState {
  products: Product[]
  initialLoaded: boolean
}

const initialState: ProductState = {
  products: [],
  initialLoaded: false
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://www.mocky.io/v2/5c3e15e63500006e003e9795');
  return await response.json()
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const item = state.products.findIndex((prod) => prod.id === action.payload.id)
      console.log('this is the item', item)
      state.products[item] = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.initialLoaded = true
    })
  }
})

export const {addProduct, removeProduct, updateProduct } = productSlice.actions;

export default productSlice.reducer

