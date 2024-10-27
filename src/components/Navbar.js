import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.png" // 로고 이미지 경로
            width="30"
            height="30"
            className="align-top d-inline-block me-2"
            alt="Uniclaso Logo"
          />
          Uniclaso
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">홈</Nav.Link>
            <Nav.Link as={Link} to="/about">소개</Nav.Link>
            <Nav.Link as={Link} to="/services">서비스</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">로그인</Nav.Link>
            <Nav.Link as={Link} to="/register">회원가입</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;