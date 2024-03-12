import axios from 'axios';
import { BASE_URL, API_LICENSE, TIME_OUT, SOCKET_URL_HTTP } from './config';

export const axiosInstance = {
  call: () => {
    return axios.create({
      baseURL: BASE_URL,
      timeout: TIME_OUT,
      headers: {
        'api-key': API_LICENSE,
      },
    });
  },
};

export const axiosInstanceSocketIO = {
  call: () => {
    return axios.create({
      baseURL: SOCKET_URL_HTTP,
      timeout: TIME_OUT,
      headers: {
        'api-key': API_LICENSE,
      },
    });
  },
};
