import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { bookAPI } from '../utils/api';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBookData();
  }, [id]);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole !== 'admin') {
      alert('Chỉ admin mới được sửa!');
      navigate('/books');
    }
  }, [navigate]);

  const fetchBookData = async () => {
    try {
      const response = await bookAPI.getBookById(id);
      const bookData = response.data;
      
      formik.setValues({
        title: bookData.title,
        author: bookData.author,
        price: bookData.price.toString(),
        category: bookData.category,
        description: bookData.description,
        image: bookData.image,
        rating: bookData.rating.toString(),
        publishedYear: bookData.publishedYear.toString(),
        pages: bookData.pages?.toString() || '',
        isbn: bookData.isbn || '',
        featured: bookData.featured || false
      });
    } catch (err) {
      setError('Không thể tải thông tin sách');
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Phải có tên sách')
      .min(3, 'Tên sách phải có ít nhất 3 ký tự'),
    author: Yup.string()
      .required('Phải có tên tác giả'),
    price: Yup.number()
      .required('Phải có giá!')
      .positive('Giá phải là số dương'),
    category: Yup.string()
      .required('Phải có thể loại'),
    description: Yup.string()
      .required('Phải mô tả')
      .min(20, 'Mô tả phải có ít nhất 20 ký tự')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      price: '',
      category: '',
      description: '',
      image: '',
      rating: '4.0',
      publishedYear: new Date().getFullYear().toString(),
      pages: '',
      isbn: '',
      featured: false
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        setSuccess('');
        
        const bookData = {
          ...values,
          price: parseFloat(values.price),
          rating: parseFloat(values.rating),
          publishedYear: parseInt(values.publishedYear),
          pages: parseInt(values.pages) || 0
        };

        await bookAPI.updateBook(id, bookData);
        
        setSuccess('Đã cập nhật sách');
        
        setTimeout(() => {
          navigate(`/books/${id}`);
        }, 1500);
        
      } catch (err) {
        setError('Lỗi khi cập nhật sách');
      }
    }
  });

  const categories = [
  'Fantasy',
  'Classic',
  'Adventure',
  'Mystery',
  'Science Fiction',
  'Romance',
  'Historical Fiction',
  'Horror',
  'Biography',
  'Poetry'
    ];

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
    <div className="max-width-800 mx-auto">
      <Card className="shadow">
        <Card.Header className="bg-light text-dark">
          <h2 className="mb-0">Chỉnh sửa sách</h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên sách *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.title && formik.errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tác giả *</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.author && formik.errors.author}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.author}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá (VND) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.price && formik.errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Thể loại *</Form.Label>
                  <Form.Select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.category && formik.errors.category}
                  >
                    <option value="">Chọn thể loại</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.description && formik.errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>URL hình ảnh</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.values.image && (
                    <div className="mt-2">
                      <img 
                        src={formik.values.image} 
                        alt="Preview" 
                        className="img-thumbnail" 
                        style={{ width: '150px', height: '200px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Năm xuất bản</Form.Label>
                      <Form.Control
                        type="number"
                        name="publishedYear"
                        value={formik.values.publishedYear}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Số trang</Form.Label>
                      <Form.Control
                        type="number"
                        name="pages"
                        value={formik.values.pages}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Sách nổi bật"
                    name="featured"
                    checked={formik.values.featured}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={() => navigate(`/books/${id}`)}
              >
                Hủy
              </Button>
              <Button 
                variant="light" 
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Đang xử lý...' : 'Cập nhật sách'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditBook;