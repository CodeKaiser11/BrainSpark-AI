import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
})

// Token automatically har request mein jaayega
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

// AI Chat
export const sendMessage = async (message) => {
    const response = await API.post('/chat', { message })
    return response.data
}

// Get History
export const getChatHistory = async () => {
    const response = await API.get('/chat/history')
    return response.data
}