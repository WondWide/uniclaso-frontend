import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './components/Navbar';

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

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Home />
      </div>
    </Router>
  );
}

export default App;