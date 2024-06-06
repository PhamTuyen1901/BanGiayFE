import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoThunk } from "./thunk";

type QuanLyNguoiDungInitailState = {
  user?: any;

  isReload: boolean;
};
const initialState: QuanLyNguoiDungInitailState = {
  user: undefined,
  //@ts-ignore
  isReload: false,
};
export const quanLiNguoiDungSlice = createSlice({
  name: "quanLyNguoiDung",
  initialState,

  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");

      state.user = undefined;
    },
    addReLoad: (state) => {
      state.isReload = !state.isReload;
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
