import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: 1,
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});
export const { actions: sproductsAction, reducer: productsReducer } =
  productsSlice;
