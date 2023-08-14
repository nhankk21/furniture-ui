import axios from 'axios';
import https from 'https';
import {readCache} from './dataCache';
import {KEY_CACHE} from '../constants/data';

const baseURL = process.env.BOUNDLESS_BASE_URL;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent,
});

export const getApi = (url: string) =>
  instance.get(url).then((res) => res?.data);

export const postApi = (url: string) =>
  instance.post(url).then((res) => res?.data);
instance.interceptors.request.use(async (config) => {
  try {
    const token = readCache(KEY_CACHE.token);
    const updatedConfig = {...config};
    if (token) {
      //@ts-ignore
      updatedConfig.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return updatedConfig;
  } catch (error) {
    return Promise.reject(error);
  }
});

export default instance;
