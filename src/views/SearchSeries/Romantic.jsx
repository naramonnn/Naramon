import './index.css'
import React,{ useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import Footer from 'views/footer';

const Romantic = () => {
    const { Member_id } = useParams();
    const [romanticSeries, setRomanticSeries] = useState([]);
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/members/${Member_id}`)
          .then((res) => {setMembers(res.data);})
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
    const search = () => {
      navigate(`/SearchSeries/${Member_id}`); 
    };
  
  return (
      <div className="home-container">
        <div className="home-content">
          <div className="navbar-con" > 
            <nav className="navbar">
              <Link to={`/HomeMember/${members.Member_id}`} key={members.Member_id}>
                <img
                  src="/csc2025/Logo.png"
                  alt="Logo"
                  className="logo"
                />
              </Link>
      
              <div className="navbar-right">
                <button className="btn" onClick={search}>
                  ค้นหา
                </button>
      
                <Link to={`/profile/${members.Member_id}`} key={members.Member_id}>
                  <img
                    src={`http://localhost:3001${members.Profile_picture}`}
                    alt={members.name}
                    className="profile-picture"
                  />
                </Link>
              </div>
            </nav>
          </div>

          <div className="category-con">
            <h5 className="category-title-s">โรแมนติก</h5>
              <div className="series-grid-s">
                {romanticSeries.map((item) => (
                  <div className="series-item-s">
                    <Link to={`/seriesm/${item.Series_code}/${members.Member_id}`} key={item.Series_code}>
                      <img
                        src={`http://localhost:3001${item.Poster}`}
                        alt={item.English_name}
                      />
                    </Link>
                  </div>
                ))}
              </div>
          </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Romantic;