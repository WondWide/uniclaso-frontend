import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      alert('로그인 성공');
    } catch (error) {
      alert('로그인 실패: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;