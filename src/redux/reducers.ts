import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
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
  const response = await fetch('http://www.mocky.io/v2/5c3e15e63500006e003e9795');
  return await response.json()
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.initialLoaded = true
    })
  }
})



export default productSlice.reducer

