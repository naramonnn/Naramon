import axios from './axiosInstance';

const suspendApi = {
  getAllReport: () => axios.get('/report'),
  getReport: (Report_code) => axios.get(`/report/${Report_code}`),
  createReport: (data) => axios.post('/report', data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  updateReport: (Report_code, data) => axios.put(`/report/${Report_code}`, data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  deleteReport: (Report_code) => axios.delete(`/report/${Report_code}`)
};

export default suspendApi;