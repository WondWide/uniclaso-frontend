import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Card, Row, Col, Button, Form, Alert } from 'react-bootstrap';

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nickname: user?.nickname || '',
    phoneNumber: '',
    address: '',
    bio: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 여기에 프로필 업데이트 API 호출 추가
      setMessage({ text: '프로필이 성공적으로 업데이트되었습니다.', type: 'success' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ text: '프로필 업데이트에 실패했습니다.', type: 'danger' });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {message.text && (
            <Alert variant={message.type} dismissible 
              onClose={() => setMessage({ text: '', type: '' })}>
              {message.text}
            </Alert>
          )}
          
          <Card>
            <Card.Body>
              <div className="mb-4 text-center">
                <div className="position-relative d-inline-block">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="mb-3 rounded-circle"
                    width="150"
                    height="150"
                    style={{ objectFit: 'cover' }}
                  />
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="bottom-0 position-absolute end-0"
                    style={{ borderRadius: '50%' }}
                  >
                    <i className="bi bi-camera"></i>
                  </Button>
                </div>
                <h2>{user.name}</h2>
                <p className="text-muted">{user.email}</p>
              </div>

              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>닉네임</Form.Label>
                    <Form.Control
                      type="text"
                      name="nickname"
                      value={profileData.nickname}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>전화번호</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>주소</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>자기소개</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </Form.Group>

                  <div className="gap-2 d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>
                      취소
                    </Button>
                    <Button variant="primary" type="submit">
                      저장
                    </Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <div className="mb-4 d-flex justify-content-between align-items-center">
                    <h4>프로필 정보</h4>
                    <Button variant="outline-primary" onClick={() => setIsEditing(true)}>
                      프로필 수정
                    </Button>
                  </div>
                  
                  <dl className="row">
                    <dt className="col-sm-3">이메일</dt>
                    <dd className="col-sm-9">{user.email}</dd>

                    <dt className="col-sm-3">닉네임</dt>
                    <dd className="col-sm-9">{profileData.nickname || '-'}</dd>

                    <dt className="col-sm-3">전화번호</dt>
                    <dd className="col-sm-9">{profileData.phoneNumber || '-'}</dd>

                    <dt className="col-sm-3">주소</dt>
                    <dd className="col-sm-9">{profileData.address || '-'}</dd>

                    <dt className="col-sm-3">자기소개</dt>
                    <dd className="col-sm-9">{profileData.bio || '-'}</dd>
                  </dl>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;