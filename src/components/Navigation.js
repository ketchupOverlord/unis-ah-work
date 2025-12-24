import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { FaBook, FaShoppingCart, FaUser } from 'react-icons/fa';

const Navigation = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <FaBook className="me-2" />
          Ruina
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/books">Sách</Nav.Link>
            <Nav.Link as={Link} to="/about">Giới thiệu</Nav.Link>
            
            {isLoggedIn && localStorage.getItem('role') === 'admin' && (
              <Nav.Link as={Link} to="/add-book">Thêm sách</Nav.Link>
            )}
          </Nav>
          
          <Nav>
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <FaShoppingCart size={20} />
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                
              </Badge>
            </Nav.Link>
            
            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                <span className="text-white me-3">
                  <FaUser className="me-1" />
                  Xin chào, {username}!
                </span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-light" size="sm" className="me-2">Đăng nhập</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="light" size="sm">Đăng ký</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;