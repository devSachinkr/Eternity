"use client";
import Spinner from "@/components/global/spinner";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/payment";
import React from "react";

const PaymentButton = () => {
  const { onSubscribe, isProcessing } = useSubscription();
  return (
    <Button className="text-sm w-full mt-2" onClick={onSubscribe}>
      <Spinner loading={isProcessing} className="w-full h-full">Upgrade</Spinner>
    </Button>
  );
};

export default PaymentButton;
