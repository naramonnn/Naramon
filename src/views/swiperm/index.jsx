import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import 'api/membersApi'; 
import './index.css';

const Swiperm = () => {
  const { Member_id } = useParams();
  const [member, setMember] = useState(null); 
  const [popularity, setPopularity] = useState([]);

  useEffect(() => {
    if (Member_id) {
      axios.get(`http://localhost:3001/members/${Member_id}`)
        .then((res) => {setMember(res.data);})
        .catch((err) => console.error(err));
    }
  }, [Member_id]);

  useEffect(() => {
      const fetchPopular = async () => {
        const response = await fetch(`http://localhost:3001/series/popular`);
        const data = await response.json();
        setPopularity(data);
      };
      fetchPopular();
    }, []);

  const navigate = useNavigate();
  const search = () => {
    navigate('/search');
  };

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
      <div >
        <nav className="navbar" >
          <div className="navbar-left">
            <img src="/csc2025/Logo.png" alt="Logo" className="logo" />
          </div>
         <div className="navbar-right">
          <button className="btn" onClick={search}>ค้นหา</button>
          
            <Link to={`/profile/${member.Member_id}`} key={member.Member_id}>
              <img
                src={`http://localhost:3001${member.Profile_picture}`}
                alt={member.name}
                className="profile-picture"
              />
            </Link>
         
          
        </div>
        </nav>
        <img src={`http://localhost:3001${item.Background}`} alt={item.English_name} />
      </div>
    </SwiperSlide>
    ))}

</Swiper>
  );
};

export default Swiperm;