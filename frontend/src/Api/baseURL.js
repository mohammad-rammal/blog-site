import axios from "axios";

const baseUrl = axios.create({ baseURL: "http://localhost:5000" });

export default baseUrl;
