"use client";
import { useState } from "react";
import axios from "axios";

export const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const onSubscribe = async () => {
    setIsProcessing(true);
    const res = await axios.get("/api/payment");
    if (res.data.status === 200) {
      return (window.location.href = `${res.data.session_url}`);
    }
    setIsProcessing(false);
  };
  return { isProcessing, onSubscribe };
};
