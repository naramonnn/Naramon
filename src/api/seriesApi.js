import axios from './axiosInstance';

const seriesApi = {
  getAllSeries: () => axios.get('/series'),
  getSeries: (Series_code) => axios.get(`/series/${Series_code}`),
  createSeries: (data) => axios.post('/series', data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  updateSeries: (Series_code, data) => axios.put(`/series/${Series_code}`, data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  deleteSeries: (Series_code) => axios.delete(`/series/${Series_code}`)
};

export default seriesApi;