import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Ajout du token à chaque requête automatiquement
axiosInstance.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const token = localStorage.getItem('token'); // ✅ Correction ici

  console.log("Token utilisé pour les requêtes :", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      alert('Votre session a expiré. Veuillez vous reconnecter.');
      localStorage.removeItem('loggedInUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
