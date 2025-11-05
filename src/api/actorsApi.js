import axios from './axiosInstance';

const actorsApi = {
  getAllActors: () => axios.get('/actors'),
  getActors: (Actors_code) => axios.get(`/actors/${Actors_code}`),
  createActors: (data) => axios.post('/actors', data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  updateActors: (Actors_code, data) => axios.put(`/actors/${Actors_code}`, data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  deleteActors: (Actors_code) => axios.delete(`/actors/${Actors_code}`)
};

export default actorsApi;