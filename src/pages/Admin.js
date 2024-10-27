import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { getUsers, updateUser } from '../services/auth0Service';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setError('사용자 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUpdate = async (userId, userData) => {
    try {
      await updateUser(userId, userData);
      await fetchUsers(); // 목록 새로고침
      setShowModal(false);
      setError(null);
    } catch (error) {
      setError('사용자 정보 업데이트에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">관리자 대시보드</h2>
      
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>이메일</th>
            <th>이름</th>
            <th>가입일</th>
            <th>마지막 로그인</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{user.last_login ? new Date(user.last_login).toLocaleDateString() : '-'}</td>
              <td>
                <Button 
                  variant="info" 
                  size="sm" 
                  onClick={() => handleEdit(user)}
                  className="me-2"
                >
                  수정
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>사용자 정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(selectedUser.user_id, {
                name: e.target.name.value,
                nickname: e.target.nickname.value,
              });
            }}>
              <Form.Group className="mb-3">
                <Form.Label>이름</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name"
                  defaultValue={selectedUser.name} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>닉네임</Form.Label>
                <Form.Control 
                  type="text" 
                  name="nickname"
                  defaultValue={selectedUser.nickname} 
                />
              </Form.Group>
              <div className="gap-2 d-flex justify-content-end">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  취소
                </Button>
                <Button variant="primary" type="submit">
                  저장
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Admin;