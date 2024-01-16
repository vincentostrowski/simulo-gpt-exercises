import axios from "axios";
import { auth } from "../config/firebase-config";
const baseUrl = `${import.meta.env.VITE_BASEURL}/api/words`;

const createWord = async (body) => {
  const token = await auth.currentUser.getIdToken();
  return axios.post(baseUrl, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getAll = async () => {
  const token = await auth.currentUser.getIdToken();
  return axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getDue = async () => {
  const token = await auth.currentUser.getIdToken();
  return axios.get(`${baseUrl}/due`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getNewQueued = async () => {
  const token = await auth.currentUser.getIdToken();
  return axios.get(`${baseUrl}/queued-new`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateWord = async (id, ease, newPosition = null) => {
  const token = await auth.currentUser.getIdToken();
  return axios.put(
    `${baseUrl}/${id}`,
    { ease, newPosition },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const deleteWord = async (id) => {
  const token = await auth.currentUser.getIdToken();
  return axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getAll,
  getDue,
  getNewQueued,
  createWord,
  updateWord,
  deleteWord,
};
