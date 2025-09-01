//set base URL
import axios from "axios";

axios.defaults.baseURL = 'https://api.myfiaivn.com/api/'

//if server response 401, redirect to login
axios.interceptors.response.use(response => {
  if (response.status === 401) {
    window.location.href = '/signin';
  }
  return response;
}, error => {
  return Promise.reject(error);
});