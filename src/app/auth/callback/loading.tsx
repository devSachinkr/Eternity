import Spinner from "@/components/global/spinner";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
};

export default loading;
