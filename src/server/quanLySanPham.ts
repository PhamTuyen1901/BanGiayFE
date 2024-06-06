import { apiInstance } from "@/constant/apiInstance";
import { NextApiResponse } from "next";

const api = apiInstance({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});
export const quanLySanPhamServices = {
  getAllProducts: async () => api.get<NextApiResponse<any>>(`./products`),
  getProductsByID: async (id: string) =>
    api.get<NextApiResponse<any>>(`./products/${id}`),
  searchProducts: async (query: string) =>
    api.get<NextApiResponse<any>>(`./search-products?${query}`),
  getTopProduct: async () => api.get<NextApiResponse<any>>(`./top-products`),
  getProductType: async () => api.get<NextApiResponse<any>>(`./products-style`),
  createProduct: async (data: any) =>
    api.post<NextApiResponse<any>>(`./product/add-product`, data),
  updateInfoProduct: async (id: any, data: any) =>
    api.put<NextApiResponse<any>>(`./product/update-product/${id}`, data),
  updateProduct: async (id: any, data: any) =>
    api.patch<NextApiResponse<any>>(`/products/${id}/purchase`, data),
};
