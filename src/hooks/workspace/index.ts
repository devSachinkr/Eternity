"use client";

import { createWorkspace } from "@/actions/workspace";
import { useMutationData } from "../mutation-data";
import { useZodForm } from "../zod-form";
import { workspaceSchema } from "@/components/global/forms/workspace-form/schema";


const useWorkspace = () => {
  const { mutate, isPending } = useMutationData({
    mutationKey: ["create-workspace"],
    mutationFn: (data: { name: string }) => createWorkspace(data.name),
    queryKey: "user-workspaces",
  });
  const { hookForm, handleSubmit } = useZodForm({
    schema: workspaceSchema,
    mutationFn: mutate,
    defaultValues: { name: "" },
  });

 

  return { isPending, hookForm, handleSubmit };
};

export { useWorkspace };
