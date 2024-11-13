"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UseMutateFunction } from "@tanstack/react-query";
interface UseZodFormProps {
  schema: z.ZodSchema;
  mutationFn: UseMutateFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: any;
}

export const useZodForm = ({
  schema,
  mutationFn,
  defaultValues,
}: UseZodFormProps) => {
  const hookForm = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues } || "",
  });

  const handleSubmit = hookForm.handleSubmit(async (data) =>
    mutationFn({ ...data })
  );
  return { hookForm, handleSubmit };
};
