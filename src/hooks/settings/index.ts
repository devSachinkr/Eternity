"use client";

import { enableFirstView, getFirstView } from "@/actions/user";
import ToastNotify from "@/components/global/toast";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const useSetting = () => {
  const [firstView, setFirstView] = useState<undefined | boolean>(undefined);
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const switchState = async (checked: boolean) => {
    setLoading(true);
    const res = await enableFirstView(checked);
    if (res.status === 200) {
      ToastNotify({
        title: res.status === 200 ? "Success" : "Oops!",
        msg: res.message ?? "",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (firstView !== undefined) return;
    const fetchData = async () => {
      setLoading(true);
      const res = await getFirstView();
      if (res.status === 200) setFirstView(res?.data);
      setLoading(false);
    };
    fetchData();
  }, [firstView]);

  return { firstView, theme, setTheme, switchState, setFirstView, loading };
};
