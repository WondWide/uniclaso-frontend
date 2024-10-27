import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        alert('프로필 불러오기 실패: ' + error.response.data.message);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>프로필 페이지</h1>
      <p>사용자 이름: {profile.username}</p>
      <p>이메일: {profile.email}</p>
    </div>
  );
}

export default Profile;