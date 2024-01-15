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

//Body will contain just 'ease' field from card practice
// should be   'easy'  or   'hard'
const updateWord = async (id, ease) => {
  const token = await auth.currentUser.getIdToken();
  return axios.put(
    `${baseUrl}/${id}`,
    { ease },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export default { getAll, getDue, getNewQueued, createWord, updateWord };
