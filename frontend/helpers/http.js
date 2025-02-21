import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3030/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export async function getTrainings() {
  const { data } = api.get("/getTrainings");
  return data;
}
