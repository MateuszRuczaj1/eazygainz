import { useQuery } from "react-query";
import { getMuscleGroups } from "@/helpers/http";
export default function useMuscles() {
  return useQuery({
    queryFn: getMuscleGroups,
    queryKey: ["muscles"],
    staleTime: 1000 * 60 * 24,
  });
}
