import { apiInstance } from "@/constant/apiInstance";
import { NextApiResponse } from "next";

const api = apiInstance({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});
export const quanLyAuthServices = {
  login: async (data: any) =>
    api.post<NextApiResponse<any>>(`./auth/login`, data),
  register: async (data: any) =>
    api.post<NextApiResponse<any>>(`./auth/register`, data),
};
