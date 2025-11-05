import axios from './axiosInstance';

const userApi = {
  getAllUser: () => axios.get('/users'),
  getUser: (id) => axios.get(`/users/${id}`),
  createUser: (data) => axios.post('/users', data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  updateUser: (id, data) => axios.put(`/users/${id}`, data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  deleteUser: (id) => axios.delete(`/users/${id}`)
};

export default userApi;