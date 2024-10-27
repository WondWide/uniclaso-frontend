import React from 'react';
import './App.css'; // 기존 스타일 파일
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 임포트
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>

      <div className="App">
        <h1>Welcome to My App</h1>
        {/* 다른 컴포넌트 및 내용 */}
      </div>


    </Router>




  );
}



export default App;
