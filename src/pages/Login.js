import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;
      
      const user = users.find(u => 
        u.email === formData.email && u.password === formData.password
      );

      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);
        localStorage.setItem('role', user.role);
        localStorage.setItem('userId', user.id);
        
        alert('Đăng nhập thành công!');
        navigate('/');
      } else {
        setError('Email hoặc mật khẩu không đúng');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Không thể kết nối đến server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card className="shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Header className="bg-dark text-white text-center">
          <h3 className="mb-0">
            <FaSignInAlt className="me-2" />
            Đăng nhập
          </h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid mb-3">
              <Button 
                variant="dark" 
                type="submit" 
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </Button>
            </div>

            <div className="text-center">
              <p className="mb-2">
                Chưa có tài khoản? 
                <Link to="/register" className="ms-1">Đăng ký ngay</Link>
              </p>
              <p className="mb-0">
                <small>Demo accounts:</small><br />
                <small>Admin: admin@bookstore.com / PW: admin123</small><br />
                <small>User: user@gmail.com / PW: user123</small>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};


export default Login;
