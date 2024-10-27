import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/forgot-password', { email });
      alert('비밀번호 재설정 이메일이 발송되었습니다.');
    } catch (error) {
      alert('오류가 발생했습니다: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h1>비밀번호 재설정</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
        />
        <button type="submit">재설정 링크 보내기</button>
      </form>
    </div>
  );
}

export default ForgotPassword;