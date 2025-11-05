import axios from './axiosInstance';

const imgApi = {
  getAllSerires: () => axios.get('/picture'),
  getSeries: (id) => axios.get(`/picture/${id}`),
  createSeries: (data) => axios.post('/picture', data),
  updateSeries: (id, data) => axios.put(`/picture/${id}`, data),
  deleteSerires: (id) => axios.delete(`/picture/${id}`)
};

export default imgApi;