import { createBodyWeightRaport, getBodyWeightRaport } from "@/helpers/http";
import { useMutation, useQuery } from "react-query";
import { useQueryClient } from "react-query";

export function useGetBodyWeightRaport(filter) {
  return useQuery({
    queryKey: ["bd-raport", filter],
    queryFn: () => getBodyWeightRaport(filter),
    select: (data) => data.data,
  });
}
export function useCreateBodyWeightRaport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBodyWeightRaport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bd-raport"] });
    },
  });
}
