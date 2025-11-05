import axios from './axiosInstance';

const reviewsApi = {
  getAllReviews: () => axios.get('/reviews'),
  getReviews: (Review_code) => axios.get(`/reviews/${Review_code}`),
  createReviews: (data) => axios.post('/reviews', data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  updateReviews: (Review_code, data) => axios.put(`/reviews/${Review_code}`, data,{ headers: {'Content-Type': 'multipart/form-data'}}),
  deleteReviews: (Review_code) => axios.delete(`/reviews/${Review_code}`)
};

export default reviewsApi;