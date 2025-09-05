// src/api/cars.js
import axios from './axiosInstance';

export const getAllCars = () => axios.get('/cars');

export const createCar = (carData, token) =>
  axios.post('/cars', carData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateCar = (id, carData, token) =>
  axios.put(`/cars/${id}`, carData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteCar = (id, token) =>
  axios.delete(`/cars/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
