import axios from "axios";
//get post delete gibi http isteklerini kullanabilmek için
const api = axios.create({
  baseURL: "http://localhost:4001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
