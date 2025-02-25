import { useQuery } from "react-query";
import { getTrainings } from "../helpers/http";
export default function useTrainings() {
  return useQuery({
    queryKey: ["trainings"],
    queryFn: getTrainings,
  });
}
