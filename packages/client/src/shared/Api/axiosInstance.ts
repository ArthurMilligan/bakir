import axios from 'axios';

// TODO: Доработать конфиг
const instance = axios.create({
  baseURL: `http://${import.meta.env.SERVER_HOST}:${
    import.meta.env.SERVER_PORT
  }`,
  timeout: 10000,
});

export default instance;
