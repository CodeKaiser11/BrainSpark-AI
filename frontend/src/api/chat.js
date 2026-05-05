import axios from './axios';

export const sendMessage = async (message, chatId = null) => {
  const res = await axios.post('/chat', { message, chatId });
  return res.data;
};

export const createChat = async (title, subject) => {
  const res = await axios.post('/chat/new', { title, subject });
  return res.data;
};

export const getHistory = async () => {
  const res = await axios.get('/chat/history');
  return res.data;
};
