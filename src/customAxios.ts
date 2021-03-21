import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://richform-7b503-default-rtdb.firebaseio.com",
});

export default customAxios;
