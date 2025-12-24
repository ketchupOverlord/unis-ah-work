import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { bookAPI } from '../utils/api';

const AddBook = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Phải có tên sách!')
      .min(3, 'Tên sách phải có ít nhất 3 ký tự'),
    author: Yup.string()
      .required('Phải có tên tác giả!'),
    price: Yup.number()
      .required('Phải có giá!')
      .positive('Giá phải là số dương'),
    category: Yup.string()
      .required('Phải có thể loại!'),
    description: Yup.string()
      .required('Phải có mô tả sách!')
      .min(20, 'Mô tả phải có ít nhất 20 ký tự'),
    publishedYear: Yup.number()
      .min(1000, 'Năm xuất bản không hợp lệ')
      .max(new Date().getFullYear(), 'Năm xuất bản không hợp lệ'),
    pages: Yup.number()
      .positive('Số trang phải là số dương'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      price: '',
      category: '',
      description: '',
      image: 'img/background/default.jpg',
      rating: 4.0,
      publishedYear: new Date().getFullYear(),
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

        await bookAPI.createBook(bookData);
        
        setSuccess('Đã thêm sách');
        formik.resetForm();
        
        setTimeout(() => {
          navigate('/books');
        }, 2000);
        
      } catch (err) {
        setError('Lỗi khi thêm sách: ' + err.message);
      }
    }
  });

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole !== 'admin') {
      alert('Chỉ admin mới được thêm!');
      navigate('/books');
    }
  }, [navigate]);

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

  return (
    <div className="max-width-800 mx-auto">
      <Card className="shadow">
        <Card.Header className="bg-dark text-white">
          <h2 className="mb-0">Thêm sách mới</h2>
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
                    label="Sách nổi bật (featured)"
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
                onClick={() => navigate('/books')}
              >
                Hủy
              </Button>
              <Button 
                variant="dark" 
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Đang xử lý...' : 'Thêm sách'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddBook;