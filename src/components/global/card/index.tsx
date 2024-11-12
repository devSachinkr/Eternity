import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

interface Props {
  description: string;
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const GlobalCard = ({ description, title, children, footer }: Props) => {
  return (
    <Card className="bg-transparent mt-4">
      <CardHeader className="p-4">
        <CardTitle className="text-md text-[#9D9D9D]">{title}</CardTitle>
        <CardDescription className="text-[#707070]">
          {description}
        </CardDescription>
      </CardHeader>
      {children && <CardContent className="pt-4">{children}</CardContent>}
      {footer && <CardFooter className="p-4">{footer}</CardFooter>}
    </Card>
  );
};

export default GlobalCard;
