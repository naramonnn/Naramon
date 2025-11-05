import './index.css'
import { useEffect, useState } from "react";
//import MyNavbar from 'views/navber';
import { useParams } from "react-router-dom";
import Swiperm from 'views/swiperm';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
//import MySwiper from '../swiper'
//import MyNavbar from '../navber';
import Footer from 'views/footer';
const Homem = () => {
  const { Member_id } = useParams();
  const [dramaSeries, setDramaSeries] = useState([]);
  const [romanticSeries, setRomanticSeries] = useState([]);
  const [thrillerSeries, setThrillerSeries] = useState([]);
  const [actionSeries, setActionSeries] = useState([]);
  const [members, setMembers] = useState([]);
  const [popularity, setPopularity] = useState([]);

  const navigate = useNavigate();
  const search = () => {
    navigate(`/SearchSeries/${Member_id}`); 
  };

  useEffect(() => {
      const fetchPopular = async () => {
        const response = await fetch(`http://localhost:3001/series/popular`);
        const data = await response.json();
        setPopularity(data);
      };
      fetchPopular();
    }, []);
      

  useEffect(() => {
    axios.get(`http://localhost:3001/members/${Member_id}`)
      .then((res) => {
                setMembers(res.data);
                console.log(res.data.Profile_picture); 
            })
      .catch((err) => console.error(err));
  }, [Member_id]);


  useEffect(() => {
    const romantic = async () => {
      const response = await fetch(`http://localhost:3001/series/category/โรแมนติก`);
      const data = await response.json();
      setRomanticSeries(data);
    };
    romantic();
  }, []);
  
  useEffect(() => {
    const drama = async () => {
      const response = await fetch(`http://localhost:3001/series/category/ดราม่า`);
      const data = await response.json();
      setDramaSeries(data);
    };
   drama();
  }, []);
  
  useEffect(() => {
    const thriller = async () => {
      const response = await fetch(`http://localhost:3001/series/category/ระทึกขวัญ`);
      const data = await response.json();
      setThrillerSeries(data);
    };
    thriller();
  }, []);

  useEffect(() => {
    const action = async () => {
      const response = await fetch(`http://localhost:3001/series/category/แอคชั่น`);
      const data = await response.json();
      setActionSeries(data);
    };
    action();
  }, []);
  

  return (
    <div className="home-container">
      <div className="home-content">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
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
          
            <Link to={`/profile/${members.Member_id}`} key={members.Member_id}>
              <img
                src={`http://localhost:3001${members.Profile_picture}`}
                alt={members.name}
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

      <h4>ซีรีส์</h4>
      <h5 className="category-title">โรแมนติก</h5>
      <div className="series-grid">
        {romanticSeries.map((item) => (
          <div className="series-item">
            <Link to={`/seriesm/${item.Series_code}/${members.Member_id}`} key={item.Series_code}>
              <img
                src={`http://localhost:3001${item.Poster}`}
                alt={item.English_name}
              />
            </Link>
          </div>
        ))}
      </div>

      <h5 className="category-title">ดราม่า</h5>
      <div className="series-grid">
        {dramaSeries.map((item) => (
          <div className="series-item">
            <Link to={`/seriesm/${item.Series_code}/${members.Member_id}`} key={item.Series_code}>
              <img
                src={`http://localhost:3001${item.Poster}`}
                alt={item.English_name}
              />
            </Link>
          </div>
        ))}
      </div>

      <h5 className="category-title">ระทึกขวัญ</h5>
      <div className="series-grid">
        {thrillerSeries.map((item) => (
          <div className="series-item">
            <Link to={`/seriesm/${item.Series_code}/${members.Member_id}`} key={item.Series_code}>
              <img
                src={`http://localhost:3001${item.Poster}`}
                alt={item.English_name}
              />
            </Link>
          </div>
        ))}
      </div>

      <h5 className="category-title">แอคชั่น</h5>
      <div className="series-grid">
        {actionSeries.map((item) => (
          <div className="series-item">
            <Link to={`/seriesm/${item.Series_code}/${members.Member_id}`} key={item.Series_code}>
              <img
                src={`http://localhost:3001${item.Poster}`}
                alt={item.English_name}
              />
            </Link>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
    </div>
     
  );
};

export default Homem;