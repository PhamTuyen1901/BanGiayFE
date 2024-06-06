import { apiInstance } from "@/constant/apiInstance";
import { NextApiResponse } from "next";

const api = apiInstance({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});
export const quanLyDatSanPhamServices = {
  bookingProducts: async (data: any) =>
    api.post<NextApiResponse<any>>(`./bill/create-bill`, data),
  getAllOrders: async () =>
    api.get<NextApiResponse<any>>(`./bill/get-bill-user`),
  getAllBills: async () => api.get<NextApiResponse<any>>(`./bill`),
  getBillsByID: async (id: string) =>
    api.get<NextApiResponse<any>>(`./bill/${id}`),
};
