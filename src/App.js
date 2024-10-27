import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import NavigationBar from './components/Navbar';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Admin from './pages/Admin';
import AdminRoute from './components/AdminRoute';

// Home 컴포넌트
function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center">
            <Card.Header>유니클라소에 오신 것을 환영합니다</Card.Header>
            <Card.Body>
              <Card.Title>놀라운 기능을 발견해보세요</Card.Title>
              <Card.Text>
                우리 플랫폼을 탐색하고 원활한 경험을 즐겨보세요.
              </Card.Text>
              <Button variant="primary" href="/register">시작하기</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

// Callback 컴포넌트
function Callback() {
  return <div>Loading...</div>;
}

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
        scope: "openid profile email"
      }}
    >
      <Router>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route path="/callback" element={<Callback />} />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                <Admin />
              </AdminRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;