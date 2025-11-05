import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

function MyNavbar() {
  const navigate = useNavigate();
  const login = () => {
    navigate('/login'); 
  };
  const conditions = () => {
    navigate('/conditions'); 
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/csc2025/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="navbar-right">
        <button className="btn" onClick={login}>เข้าสู่ระบบ</button>
        <button className="btn" onClick={conditions}>สมัครสมาชิก</button>
      </div>
    </nav>
  );
};

export default MyNavbar;