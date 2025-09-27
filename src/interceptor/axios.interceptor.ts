//set base URL
import { clearUserInfo } from "@/hooks/account/useInfo";
import axios from "axios";

axios.defaults.baseURL = 'https://api.myfiaivn.com/api/'

//if server response 401, redirect to login
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    clearUserInfo();
    document.cookie = '';
    window.location.href = '/signin';
  }
  return Promise.reject(error);
});