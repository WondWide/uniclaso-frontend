import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password
      });
      alert('회원가입 성공: ' + response.data.message);
    } catch (error) {
      alert('회원가입 실패: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="사용자 이름" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Register;