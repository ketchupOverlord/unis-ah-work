import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
        
        {}
        <footer className="bg-dark text-white text-center py-3 mt-5">
          <Container>
            <p>© Ruina. All rights reserved.</p>
            <p>Website giới thiệu sách</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;