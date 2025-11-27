import axios from "axios";

// Axios base URL function
export const baseURL = () => axios.create({ baseURL: "http://localhost:5000" });
