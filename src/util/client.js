import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3030/',
  headers: { 'Access-Control-Allow-Origin': 'http://localhost:3030' }
});

export default client;
