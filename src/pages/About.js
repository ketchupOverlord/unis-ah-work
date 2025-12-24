import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaBook, FaUsers, FaAward, FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="fw-bold">Về Ruina</h1>
      </div>

      <Row className="mb-5">
        <Col md={6}>
          <Card className="h-100 shadow">
            <Card.Body className="p-4">
              <h3 className="fw-bold mb-4">Origin</h3>
              <p>
                Website giới thiệu sách
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="h-100 shadow">
            <Card.Body className="p-4">
              <h3 className="fw-bold mb-4">Purpose</h3>
              <div className="mb-4">
                <h5><FaBook className="me-2 text-primary" />Cool symbol</h5>
                <p>
                  Website giới thiệu sách
                </p>
              </div>
              <div>
                <h5><FaAward className="me-2 text-danger" />Cool symbol</h5>
                <p>
                  Website giới thiệu sách
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {}
      <div className="mb-5">
        <h2 className="text-center mb-4">Team</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="text-center">
              <Card.Img 
                variant="top" 
                src="img/staff/Faker.jpg"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>Lee Sanghyeok</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Nhân viên</Card.Subtitle>
                <Card.Text>
                  Nhiều kinh nghiệm
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="text-center">
              <Card.Img 
                variant="top" 
                src="img/staff/kojimbo.jpg"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>Kojimbo</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Nhân viên</Card.Subtitle>
                <Card.Text>
                  Nhiều kinh nghiệm
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="text-center">
              <Card.Img 
                variant="top" 
                src="img/staff/roland.jpg"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>Roland</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Nhân viên</Card.Subtitle>
                <Card.Text>
                  Nhiều kinh nghiệm
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {}
      <Card className="shadow">
        <Card.Body className="p-5 text-center">
          <h3 className="fw-bold mb-4">Liên hệ với chúng tôi</h3>
          <p className="mb-4">
            Bạn có câu hỏi hoặc cần hỗ trợ?
          </p>
          <div className="mb-4">
            <p><strong>Email:</strong> support@ruina.com</p>
            <p><strong>Hotline:</strong> 1900 1234</p>
            <p><strong>Địa chỉ:</strong> Outskirt, the City</p>
          </div>
          <Button variant="dark" size="lg">
            Gửi tin nhắn
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default About;