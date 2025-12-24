import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      const checkResponse = await axios.get('http://localhost:3001/users');
      const existingUsers = checkResponse.data;
      
      const userExists = existingUsers.find(
        user => user.email === formData.email || user.username === formData.username
      );
      
      if (userExists) {
        setError('Email hoặc tên người dùng đã tồn tại');
        setLoading(false);
        return;
      }

      const newUser = {
        id: existingUsers.length > 0 
          ? Math.max(...existingUsers.map(u => u.id)) + 1 
          : 1,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'user'
      };

      await axios.post('http://localhost:3001/users', newUser);
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', newUser.username);
      localStorage.setItem('email', newUser.email);
      localStorage.setItem('role', newUser.role);
      
      setSuccess('Đăng ký thành công');
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (err) {
      console.error('error', err);
    } 
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card className="shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Header className="bg-dark text-white text-center">
          <h3 className="mb-0">
            <FaUserPlus className="me-2" />
            Đăng ký tài khoản
          </h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="dark">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên người dùng *</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Nhập tên người dùng"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="3"
              />
              <Form.Text className="text-muted">
                Tối thiểu 3 ký tự
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu *</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Xác nhận mật khẩu *</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
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
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
              </Button>
            </div>

            <div className="text-center">
              <p className="mb-0">
                Đã có tài khoản? 
                <Link to="/login" className="ms-1">Đăng nhập ngay</Link>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;