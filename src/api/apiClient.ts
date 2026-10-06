import axios from 'axios';
import AuthHelper from './helpers/AuthHelper';
import { API_ENDPOINTS } from './endpoints';

const BASE_URL = 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  async config => {
    const token = await AuthHelper.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return apiClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = await AuthHelper.getRefreshToken();

      if (!refreshToken) {
        await AuthHelper.clearTokens();
        return Promise.reject(error);
      }

      return new Promise((resolve, reject) => {
        axios
          .post(`${BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
            refreshToken,
          })
          .then(async ({ data }) => {
            const newAccessToken = data.data.accessToken;
            const newRefreshToken = data.data.refreshToken;

            await AuthHelper.setTokens(newAccessToken, newRefreshToken);
            apiClient.defaults.headers.common.Authorization =
              'Bearer ' + newAccessToken;
            originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;

            processQueue(null, newAccessToken);
            resolve(apiClient(originalRequest));
          })
          .catch(async err => {
            processQueue(err, null);
            await AuthHelper.clearTokens();
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export default apiClient;
