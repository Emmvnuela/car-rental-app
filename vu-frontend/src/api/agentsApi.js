import axios from '../api/axiosInstance';

export const createAgent = async (agent) => {
  return axios.post('/agents', agent);
};

export const getAgents = async () => {
  return axios.get('/agents');
};