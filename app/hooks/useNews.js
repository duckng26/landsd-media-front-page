import { freeTextSearch } from "../lib/clientActions";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useFreeTextNewsSearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: freeTextSearch,
    onSuccess: (news) => {
      queryClient.setQueriesData(["news"], () => news);
    },
  });
};
