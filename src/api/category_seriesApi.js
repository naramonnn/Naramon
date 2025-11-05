import axios from './axiosInstance';

const category_seriesApi = {
  getAllCategorySeries: () => axios.get('/category_series'),
  getCategorySeries: (CategorySeries_code) => axios.get(`/category_series/${CategorySeries_code}`),
  createCategorySeries: (data) => axios.post('/category_series', data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  updateCategorySeries: (CategorySeries_code, data) => axios.put(`/category_series/${CategorySeries_code}`, data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  deleteCategorySeries: (CategorySeries_code) => axios.delete(`/category_series/${CategorySeries_code}`)
};

export default category_seriesApi;