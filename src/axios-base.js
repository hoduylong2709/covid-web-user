import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://doancnpm.azurewebsites.net/'
});

export default instance;