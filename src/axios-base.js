import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://doancnpm.azurewebsites.net/'
});

export default instance;