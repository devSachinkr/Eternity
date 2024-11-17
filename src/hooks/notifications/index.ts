"use client";

import { getNotifications } from "@/actions/user";
import { useQueryData } from "../query-data";

export const useNotification = () => {
  const { data, isFetched } = useQueryData(
    ["user-notifications"],
    getNotifications
  );
  const { data: notifications, status } = data as {
    status: number;
    data: {
      notification: {
        id: string;
        userId: string;
        content: string;
      }[];
    };
  };
  return {
    notifications,
    status,
    isFetched,
  };
};
