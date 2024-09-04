"use client";
import axios from "axios";
import { useSession } from "next-auth/react";

export const useUserUpdate = () => {
  const { update } = useSession();
  const updateUser = async (newName: string) => {
    try {
      const res = await axios.put("/api/user/update", { name: newName });
      update();
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { updateUser };
};
