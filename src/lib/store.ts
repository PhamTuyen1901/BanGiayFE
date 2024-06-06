import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./features/productSlice";
import { authReducer } from "./features/quanLyAuth/authSlice";
import { quanLyNguoiDungReducer } from "./features/quanLyNguoiDung/slice";
import { getUserInfoThunk } from "./features/quanLyNguoiDung/thunk";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      users: quanLyNguoiDungReducer,
      auth: authReducer,
    },
    devTools: true,
  });
  store.dispatch(getUserInfoThunk());
  return store;
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
