import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function NavigationBar() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">Uniclaso</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">홈</Nav.Link>
          </Nav>
          <Nav>
            {isLoading ? (
              <Nav.Link>로딩중...</Nav.Link>
            ) : !isAuthenticated ? (
              <Nav.Link onClick={() => loginWithRedirect()}>로그인</Nav.Link>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light">
                  {user?.name || user?.email}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">프로필</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => logout({ 
                    logoutParams: { returnTo: window.location.origin } 
                  })}>
                    로그아웃
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;