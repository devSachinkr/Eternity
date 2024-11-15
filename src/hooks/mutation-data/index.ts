"use client";
import ToastNotify from "@/components/global/toast";
import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";

const useMutationData = ({
  mutationFn,
  queryKey,
  mutationKey,
  onSuccess,
}: {
  mutationKey: MutationKey;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationFn: MutationFunction<any, any>;
  queryKey?: string;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn,
    mutationKey,
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
        return ToastNotify({
          title: `${data?.status === 200 || data?.status === 201  ? "Success" : "Oops!"}`,
          msg: `${
            data?.status === 200|| data?.status === 201
              ? "Data has been updated successfully"
              : "Something went wrong"
          }`,
        });
      
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
  return { mutate, isPending };
};
export { useMutationData };

export const useMutationDataState = ({
  mutationKey,
}: {
  mutationKey: MutationKey;
}) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variables: mutation.state.variables as any,
        status: mutation.state.status,
      };
    },
  });
  const latestVariables = data[data.length - 1];
  return { latestVariables };
};
