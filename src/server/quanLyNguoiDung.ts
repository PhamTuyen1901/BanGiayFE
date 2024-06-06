import { apiInstance } from "@/constant/apiInstance";
import { NextApiResponse } from "next";

const api = apiInstance({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});
export const quanLyNguoiDungServices = {
  getPurchaseHistory: async (id: string) =>
    api.get<NextApiResponse<any>>(`./orders/history/${id}`),
  getAllUser: async () => api.get<NextApiResponse<any>>(`./users`),
  getUserByName: async (name: string) =>
    api.get<NextApiResponse<any>>(`./users/search?name=${name}`),
  getUserInfo: async () => api.get<NextApiResponse<any>>(`./auth/user-infor`),
  updateInfoUser: async (data: any) =>
    api.put<NextApiResponse<any>>(`./user/update-user-info`, data),
  updateInfoUserAdmin: async (id: any, data: any) =>
    api.put<NextApiResponse<any>>(`./user/update-user-info-admin/${id}`, data),
  addfavorites: async (data: any) =>
    api.post<NextApiResponse<any>>(`./user-favorites/add`, data),
  deletefavorites: async (data: any) =>
    api.post<NextApiResponse<any>>(`./user-favorites/remove`, data),
  getfavoritesUser: async (userId: any) =>
    api.get<NextApiResponse<any>>(`./favorites/${userId}`),
};
