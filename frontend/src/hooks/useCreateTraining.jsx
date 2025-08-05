import { useMutation } from "react-query";
import { createTraining } from "@/helpers/http";
export default function useCreateTraining() {
  return useMutation(createTraining, {});
}
