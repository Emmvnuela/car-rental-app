import axios from 'axios';
const API = 'http://localhost:5000/api/damages';

export const getDamages = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createDamage = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const deleteDamage = async (id) => {
  await axios.delete(`${API}/${id}`);
};
