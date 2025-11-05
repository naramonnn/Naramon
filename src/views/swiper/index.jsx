import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import './index.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

const MySwiper = () => {
  const navigate = useNavigate();
  const [popularity, setPopularity] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const response = await fetch(`http://localhost:3001/series/popular`);
      const data = await response.json();
      setPopularity(data);
    };
    fetchPopular();
  }, []);

  const login = () => navigate('/login');
  const signup = () => navigate('/signup');

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {popularity.map((item) => (
        <SwiperSlide key={item.Series_code}>
          <div className="slide-container">
            <nav className="navbar">
              <div className="navbar-left">
                <img src="/csc2025/Logo.png" alt="Logo" className="logo" />
              </div>
              <div className="navbar-right">
                <button className="btn" onClick={login}>เข้าสู่ระบบ</button>
                <button className="btn" onClick={signup}>สมัครสมาชิก</button>
              </div>
            </nav>
            <img
              src={`http://localhost:3001${item.Background}`}
              alt={item.English_name}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySwiper;
