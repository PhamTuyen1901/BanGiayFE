import { apiInstance } from "@/constant/apiInstance";
import { NextApiResponse } from "next";

const api = apiInstance({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});
export const quanLyDoanhThuServices = {
  getRenueByMonth: async (year: any) =>
    api.get<NextApiResponse<any>>(`./revenue/monthly/${year}`),
  getRevenueByYear: async () =>
    api.get<NextApiResponse<any>>(`./revenue/yearly`),
};
