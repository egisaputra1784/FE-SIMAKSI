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

api.interceptors.response.use(
  res => res, // kalau sukses, return response
  err => {
    if (err.response?.status === 401) {
      // token invalid atau expired
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    }
    return Promise.reject(err)
  }
)



export default api
