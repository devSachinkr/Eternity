import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col py-10 xl:px-0 container">{children}</div>
  );
};

export default layout;
