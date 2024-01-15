import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}/api/users`;

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

export default { create };
