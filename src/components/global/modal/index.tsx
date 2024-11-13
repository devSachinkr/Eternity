import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const index = ({ children, trigger, title, description, className }: Props) => {
  return (
    <Dialog >
      <DialogTrigger className={className}>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default index;
