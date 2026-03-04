import axios from 'axios'

const api = axios.create({
  baseURL: 'https://firmly-splendid-dove.ngrok-free.app/api', // ganti pake URL ngrok lu
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})




export default api
