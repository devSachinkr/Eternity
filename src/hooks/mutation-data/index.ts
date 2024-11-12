"use client";
import ToastNotify from "@/components/global/toast";
import {
  MutationFunction,
  MutationKey,
  useMutation,
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
      if (onSuccess) {
        return ToastNotify({
          title: `${data?.status === 200 ? "Success" : "Oops!"}`,
          msg: `${
            data?.status === 200
              ? "Data has been updated successfully"
              : "Something went wrong"
          }`,
        });
      }
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
  return { mutate, isPending };
};
export { useMutationData };
