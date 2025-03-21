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
export async function register(formBody) {
  const parsedBody = JSON.stringify(formBody);
  const data = await api.post("/register", parsedBody);
  console.log(data);
  return data;
}
export async function login(formBody) {
  const parsedBody = JSON.stringify(formBody);
  const data = await api.post("/login", parsedBody);
  console.log(data);
  return data;
}
export async function getMuscleGroups() {
  const data = (await api.get("/exercises/getMuscleGroups")).data;
  return data;
}
