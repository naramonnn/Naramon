import axios from './axiosInstance';

const membersApi = {
  getAllMembers: () => axios.get('/members'),
  getMembers: (Members_id) => axios.get(`/members/${Members_id}`),
  createMembers: (data) => axios.post('/members', data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  updateMembers: (Members_id, data) => axios.put(`/members/${Members_id}`, data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  deleteMembers: (Members_id) => axios.delete(`/members/${Members_id}`)
};

export default membersApi;