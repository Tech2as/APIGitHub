import axios from 'axios';

//consumir api
const api = axios.create({
    baseURL: 'https://api.github.com',
})

export default api;