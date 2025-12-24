import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const bookAPI = {
  getAllBooks: () => api.get('/books'),
  getBookById: (id) => api.get(`/books/${id}`),
  createBook: (bookData) => api.post('/books', bookData),
  updateBook: (id, bookData) => api.put(`/books/${id}`, bookData),
  deleteBook: (id) => api.delete(`/books/${id}`),
  searchBooks: (keyword) => api.get(`/books?q=${keyword}`)
};

export const userAPI = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
  getUsers: () => api.get('/users')
};

export const categoryAPI = {
  getCategories: () => api.get('/categories')
};

export default api;