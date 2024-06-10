import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoThunk } from "./thunk";

type QuanLyNguoiDungInitailState = {
  user?: any;
  carts: any[];
  isReload: boolean;
};
const initialState: QuanLyNguoiDungInitailState = {
  user: undefined,

  isReload: false, //@ts-ignore
  carts: JSON.parse(localStorage.getItem("carts")) || [],
};
export const quanLiNguoiDungSlice = createSlice({
  name: "quanLyNguoiDung",
  initialState,

  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      state.user = undefined;
      state.carts = [];
      state.user = undefined;
    },
    addReLoad: (state) => {
      state.isReload = !state.isReload;
    },
    addCart: (state, action) => {
      const { productId } = action.payload;

      // @ts-ignore
      if (!state.carts.includes(productId)) {
        // @ts-ignore
        state.carts.push(productId);
        localStorage.setItem("carts", JSON.stringify(state.carts));
      }
    },
    deleteCart: (state, action) => {
      const { productId } = action.payload;

      // @ts-ignore
      const index = state.carts.indexOf(productId);
      if (index !== -1) {
        // @ts-ignore
        state.carts.splice(index, 1);
        localStorage.setItem("carts", JSON.stringify(state.carts));
      }
    },
    deleteAllCart: (state) => {
      localStorage.removeItem("cart");
      state.carts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
      if (payload) {
        //@ts-ignore
        state.user = payload.user;
      }
    });
  },
});
export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungActions,
} = quanLiNguoiDungSlice;
