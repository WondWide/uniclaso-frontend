import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/reset-password/${token}`, { password });
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      alert('오류가 발생했습니다: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h1>비밀번호 재설정</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="새 비밀번호"
          required
        />
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
}

export default ResetPassword;