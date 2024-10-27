import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center">
            <Card.Header>Welcome to Uniclaso</Card.Header>
            <Card.Body>
              <Card.Title>Discover Amazing Features</Card.Title>
              <Card.Text>
                Explore our platform and enjoy the seamless experience we offer.
              </Card.Text>
              <Button variant="primary" href="/register">Get Started</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;