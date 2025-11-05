
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // baseURL ของ API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
    // 'Authorization': Bearer ${token} // เพิ่มในภายหลังได้
  }
});

// Interceptors เช่น token หรือ logging
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
