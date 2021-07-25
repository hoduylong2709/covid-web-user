import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://newdoancnpm.azurewebsites.net/'
});

instance.defaults.timeout = 10000;

export default instance;