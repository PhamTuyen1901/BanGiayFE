import { quanLyNguoiDungServices } from "@/server";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfoThunk = createAsyncThunk(
  "quanLyNguoiDung/getUserInfo",

  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("token");

      if (accessToken) {
        const { data } = await quanLyNguoiDungServices.getUserInfo();
        return data;
      }
      return undefined;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
