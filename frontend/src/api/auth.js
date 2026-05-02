import axios from './axios';

export const register = async (name, email, password) => {
  const res = await axios.post('/auth/register', { name, email, password });
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post('/auth/login', { email, password });
  return res.data;
};
