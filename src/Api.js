import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:8080/laravel8/laravel8/public/api`
});