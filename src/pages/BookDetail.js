import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { bookAPI } from '../utils/api';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await bookAPI.getBookById(id);
      setBook(response.data);
    } catch (err) {
      setError('Không thể tải thông tin sách');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      try {
        await bookAPI.deleteBook(id);
        alert('Xóa sách thành công!');
        navigate('/books');
      } catch (err) {
        alert('Lỗi khi xóa sách');
      }
    }
  };

  const isAdmin = () => {
    return localStorage.getItem('role') === 'admin';
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="dark" />
        <p className="mt-2">Đang tải thông tin sách...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <Alert variant="danger">
        {error || 'Không tìm thấy sách'}
        <Button variant="outline-danger" className="ms-3" onClick={() => navigate('/books')}>
          Quay lại
        </Button>
      </Alert>
    );
  }

  return (
    <div>
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate('/books')}
        className="mb-4"
      >
        <FaArrowLeft className="me-2" />
        Quay lại danh sách
      </Button>

      <Card className="shadow">
        <Row className="g-0">
          <Col md={4}>
            <Card.Img 
              src={book.image} 
              alt={book.title}
              style={{ 
                height: '100%', 
                objectFit: 'cover',
                minHeight: '400px'
              }}
            />
          </Col>
          <Col md={8}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h1 className="fw-bold mb-3">{book.title}</h1>
                  <h4 className="text-muted mb-4">Tác giả: {book.author}</h4>
                </div>
                
                <div className="text-end">
                  <h2 className="text-dark fw-bold mb-3">{book.price.toLocaleString()} đ</h2>
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <h5>Thông tin chi tiết</h5>
                <Row className="mt-3">
                  <Col md={6}>
                    <p><strong>Thể loại:</strong> {book.category}</p>
                    <p><strong>Năm xuất bản:</strong> {book.publishedYear}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Số trang:</strong> {book.pages} trang</p>
                    <p><strong>ISBN:</strong> {book.isbn || 'N/A'}</p>
                  </Col>
                </Row>
              </div>

              <div className="mb-4">
                <h5>Mô tả</h5>
                <p className="lead">{book.description}</p>
              </div>

              <div className="d-flex gap-2">
                <Button 
                  variant="dark"
                  onClick={() => window.alert('Chức năng thêm vào giỏ hàng đang phát triển!')}
                >
                  Thêm vào giỏ hàng
                </Button>
                
                {isAdmin() && (
                  <>
                    <Button 
                      variant="warning"
                      onClick={() => navigate(`/edit-book/${id}`)}
                    >
                      <FaEdit className="me-2" />
                      Chỉnh sửa
                    </Button>
                    <Button 
                      variant="danger"
                      onClick={handleDelete}
                    >
                      <FaTrash className="me-2" />
                      Xóa sách
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default BookDetail;