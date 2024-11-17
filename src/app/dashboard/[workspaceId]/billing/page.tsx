import { getPaymentInfo } from "@/actions/user";
import React from "react";


const BillingPage = async () => {
  const { data, status } = await getPaymentInfo();
  if (status !== 200) {
    return;
  }
  return (
    <div className="bg-[#1D1D1D] flex flex-col gap-y-8 p-5 rounded-xl">
      <div>
        <h2 className="text-2xl font-semibold">Current Plan</h2>
        <p className="text-sm text-[#BdBdBd]">
          Manage your billing and subscription
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">
          ₹{data?.subscription?.plan === "PRO" ? "599" : "Free"}/m
        </h2>
        <p className="text-sm font-semibold text-[#9D9D9D]">
          {data?.subscription?.plan}
        </p>
      </div>
    </div>
  );
};

export default BillingPage;
