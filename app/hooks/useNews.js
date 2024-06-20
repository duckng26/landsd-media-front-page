import { fetchNewsData } from "../lib/clientActions";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useFreeTextNewsSearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (q) => {
      fetchNewsData('', q)},
    onSuccess: (news) => {
      console.log(news)
      queryClient.setQueryData(["news"], () => news || {});
    },
  });
};
