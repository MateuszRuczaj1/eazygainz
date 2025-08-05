import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3030/api",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("accessToken");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403) {
      originalRequest._retry = true;
    }
    try {
      const response = await axios.get("http://localhost:3030/refresh", {
        withCredentials: true,
      });
      if (response) {
        localStorage.setItem("accessToken", response.data.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return Promise.reject(error);
  }
);
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
export async function createTraining(formBody) {
  const parsedBody = JSON.stringify(formBody);
  const data = await api.post("/getTrainings", parsedBody);
  console.log(data);
  return data;
}
export async function getBodyWeightRaport(filter = "month") {
  const data = api.get(`/bodyWeight?filter=${filter}`);
  return data;
}
export async function createBodyWeightRaport({ weight, weightedAt }) {
  console.log(weight, weightedAt);
  const body = {
    weight: parseFloat(weight),
    weightedAt,
  };

  const parsedBody = JSON.stringify(body);
  const data = await api.post("/bodyWeight/create-raport", parsedBody);
  console.log(data);
  return data;
}
