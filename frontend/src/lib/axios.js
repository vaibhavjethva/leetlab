import axios from "axios";
console.log(import.meta.env.MODE);
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api/v1"
      : "https://leetlab-backend-gihn.onrender.com/api/v1",
  withCredentials: true,
});
