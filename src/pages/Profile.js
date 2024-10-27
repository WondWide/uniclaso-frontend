import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

function Profile() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

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

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <div className="mb-4 text-center">
                {user?.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="mb-3 rounded-circle"
                    width="100"
                    height="100"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <h2>{user.name}</h2>
                <p className="text-muted">{user.email}</p>
              </div>
              
              <h4 className="mb-3">프로필 정보</h4>
              <div className="p-3 rounded bg-light">
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>

              <div className="mt-4 text-center">
                <Button 
                  variant="outline-danger"
                  onClick={() => logout({ 
                    logoutParams: { returnTo: window.location.origin } 
                  })}
                >
                  로그아웃
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;