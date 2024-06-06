import { quanLyAuthServices } from "@/server/quanLyAuth";
import { createAsyncThunk } from "@reduxjs/toolkit";

const removeCharactersBeforePipe: any = (data: any) => {
  if (typeof data === "string") {
    const index = data.indexOf("|");
    if (index !== -1) {
      return data.substring(index + 1);
    }
    return data;
  } else if (Array.isArray(data)) {
    return data.map((item) => removeCharactersBeforePipe(item));
  } else if (typeof data === "object" && data !== null) {
    const newData = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        //@ts-ignore
        newData[key] = removeCharactersBeforePipe(data[key]);
      }
    }
    return newData;
  }
  return data;
};

export const loginThunk = createAsyncThunk(
  "quanLyAuth/loginThunk",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await quanLyAuthServices.login(payload);
      //@ts-ignore
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "quanLyAuth/registerThunk",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await quanLyAuthServices.register(payload);
      //@ts-ignore

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
