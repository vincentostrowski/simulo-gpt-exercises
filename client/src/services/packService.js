import axios from "axios";
import { auth } from "../config/firebase-config";
const baseUrl = `${import.meta.env.VITE_BASEURL}/api/packs`;

const getAll = async () => {
  const token = await auth.currentUser.getIdToken();
  return axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const downloadPack = async (id) => {
  const token = await auth.currentUser.getIdToken();
  return axios.get(`${baseUrl}/download/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getAll,
  downloadPack,
};
