import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { bookAPI } from '../utils/api';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { value: 'all', label: 'Tất cả thể loại' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Classic', label: 'Văn học kinh điển' },
    { value: 'Mystery', label: 'Trinh thám' },
    { value: 'Adventure', label: 'Phiêu lưu' }
  ];

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [searchTerm, selectedCategory, books]);

  const fetchBooks = async () => {
    try {
      const response = await bookAPI.getAllBooks();
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = [...books];

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    setFilteredBooks(filtered);
  };

  const handleDelete = async (id) => {
    if (localStorage.getItem('role') !== 'admin') {
      alert('Chỉ admin');
      return;
    }
    
    if (window.confirm('Bạn có chắc chắn muốn xóa sách?')) {
      try {
        await bookAPI.deleteBook(id);
        fetchBooks();
        alert('Đã xóa sách');
      } catch (error) {
        alert('Lỗi');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const isAdmin = () => {
    return localStorage.getItem('role') === 'admin';
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Thư viện sách</h1>
        
        {isAdmin() && (
          <Button as={Link} to="/add-book" variant="dark">
            + Thêm sách mới
          </Button>
        )}
      </div>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={8}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm sách theo tên, tác giả..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">Không tìm thấy sách phù hợp</h4>
          <Button variant="outline-primary" onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
          }}>
            Xóa bộ lọc
          </Button>
        </div>
      ) : (
        <>
          <p className="text-muted mb-4">
            Hiển thị {filteredBooks.length} trong tổng số {books.length} sách
          </p>
          
          <Row>
            {filteredBooks.map((book) => (
              <Col key={book.id} lg={4} md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={book.image} 
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold">{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.author} • {book.publishedYear}
                    </Card.Subtitle>
                    <Card.Text className="text-muted small mb-2">
                      {book.category}
                    </Card.Text>
                    <Card.Text className="flex-grow-1">
                      {book.description.length > 100 
                        ? `${book.description.substring(0, 100)}...` 
                        : book.description}
                    </Card.Text>
                    
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="text-dark mb-0">
                          {book.price.toLocaleString()} đ
                        </h4>
                        
                        <div className="d-flex gap-2">
                          <Button 
                            as={Link} 
                            to={`/books/${book.id}`}
                            variant="outline-dark" 
                            size="sm"
                          >
                            Chi tiết
                          </Button>
                          
                          {isAdmin() && (
                            <>
                              <Button 
                                as={Link} 
                                to={`/edit-book/${book.id}`}
                                variant="outline-warning" 
                                size="sm"
                              >
                                <FaEdit />
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDelete(book.id)}
                              >
                                <FaTrash />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default Books;