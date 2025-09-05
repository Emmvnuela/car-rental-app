// src/api/missionsApi.js
import axiosInstance from './axiosInstance'; // toujours utiliser l'instance configurée

export const getMissions = async () => {
  return axiosInstance.get('/missions');
};

export const createMission = async (missionData) => {
  return axiosInstance.post('/missions', missionData);
};

export const deleteMission = async (id) => {
  return axiosInstance.delete(`/missions/${id}`);
};
