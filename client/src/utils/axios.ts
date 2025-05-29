import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:3300/api",
  withCredentials: true,
});

export default axiosApi;
