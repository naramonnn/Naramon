import axios from './axiosInstance';

const signupApi = {
  checksignup: (data) => axios.post('/signup',data)
};

export default signupApi;