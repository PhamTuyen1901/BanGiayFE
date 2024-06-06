import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "./authThunk";

export const removeCharactersBeforePipe: any = (data: any) => {
  if (typeof data === "string") {
    return data.replace(/.*\|/, "");
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

const initialState = {};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //@ts-ignore
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      //@ts-ignore
      const newToken = removeCharactersBeforePipe(payload.token);

      if (payload) localStorage.setItem("token", newToken);
    }),
      builder.addCase(registerThunk.fulfilled, (state, { payload }) => {
        //@ts-ignore
        const newToken = removeCharactersBeforePipe(payload.token);

        if (payload) localStorage.setItem("token", newToken);
      });
  },
});
export const { actions: authAction, reducer: authReducer } = authSlice;
