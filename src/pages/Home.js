import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { bookAPI } from '../utils/api';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      const response = await bookAPI.getAllBooks();
      const books = response.data;
      const featured = books.filter(book => book.featured).slice(0, 4);
      setFeaturedBooks(featured);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <div className="mb-5 text-center">
        <div 
          className="bg-dark text-white p-5 rounded"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('img/background/bg1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <h1 className="display-5 fw-bold">Welcome to Ruina</h1>
          <p className="lead">Nơi lưu trữ những cuốn sách</p>
          <Button as={Link} to="/books" variant="light" size="lg" className="mt-3">
            Xem sách ngay <FaArrowRight className="ms-2" />
          </Button>
        </div>
      </div>

      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Sách nổi bật</h2>
          <Button as={Link} to="/books" variant="outline-dark">
            Xem tất cả <FaArrowRight className="ms-1" />
          </Button>
        </div>

        <Row>
          {featuredBooks.map((book) => (
            <Col key={book.id} lg={3} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={book.image} 
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{book.title}</Card.Title>
                  <Card.Text className="text-muted mb-2">{book.author}</Card.Text>
                  <Card.Text className="text-muted small mb-3">
                    {book.category} • {book.publishedYear}
                  </Card.Text>
                  
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="text-dark mb-0">{book.price.toLocaleString()} đ</h5>
                      <Button 
                        as={Link} 
                        to={`/books/${book.id}`}
                        variant="dark" 
                        size="sm"
                      >
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="mb-5">
        <h2 className="fw-bold mb-4">Thể loại sách</h2>
        <Row>
          {['Fantasy', 'Classic', 'Mystery', 'Adventure'].map((category, index) => (
            <Col key={index} md={3} className="mb-3">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>{category}</Card.Title>
                  <Button 
                    as={Link} 
                    to="/books"
                    variant="outline-dark" 
                    size="sm"
                  >
                    Xem sách
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Home;