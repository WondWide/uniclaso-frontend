import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 사용자가 인증되지 않았거나 관리자 역할이 없는 경우
  if (!isAuthenticated || !user?.['https://uniclaso.com/roles']?.includes('admin')) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;