"use client";
import { useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";

export const useAuth = () => {
  const { user } = useAppSelector((state: RootState) => state.users);
  return { user };
};
