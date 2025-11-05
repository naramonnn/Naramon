import axios from './axiosInstance';

const loginApi = {
  checklogin: (data) => axios.post('/login',data)
};

export default loginApi;