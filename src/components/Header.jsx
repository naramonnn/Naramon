import React from 'react';
import './Header.css'; // Import ไฟล์ CSS สำหรับ Header
import { Link } from 'react-router-dom'; // สำหรับการนำทางใน React

// สมมติว่ามีโลโก้ในโฟลเดอร์ assets
import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="Company Logo" />
        </Link>
      </div>
      <nav className="header-nav">
        <Link to="/login" className="header-button login">
          เข้าสู่ระบบ
        </Link>
        <Link to="/signup" className="header-button signup">
          สมัครสมาชิก
        </Link>
      </nav>
    </header>
  );
};

export default Header;