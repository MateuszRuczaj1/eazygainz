import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3030/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export async function getTrainings() {
  const data = (await api.get("/getTrainings")).data;
  console.log(data);
  return data;
}
