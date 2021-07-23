import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://newdoancnpm.azurewebsites.net/'
});

export default instance;