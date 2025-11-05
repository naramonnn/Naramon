import './profile.css'
import React,{ useEffect, useState } from "react";
import { useParams,Link  } from "react-router-dom";
import axios from "axios";
import Footer from 'views/footer';
const Profile = () => {
  const { Member_id } = useParams();
  const [members, setMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [reviewedSeries, setReviewedSeries] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/members/${Member_id}`)
      .then((res) => setMembers(res.data))
      .catch((err) => console.error(err));
  }, [Member_id]);

  useEffect(() => {
    axios.get(`http://localhost:3001/members/members/${Member_id}/reviewed`)
      .then(res => setReviewedSeries(res.data))
      .catch(err => console.error(err));
  }, [Member_id]);

  return (
    <div className="home-container-p">
      <div className="home-content-p">
        <div className="navbar">
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </div>

          <div className={`dropdown ${isOpen ? "show" : ""}`}>
            <a href={`/csc2025/editprofile/${Member_id}`}>แก้ไขข้อมูลส่วนตัว</a>
            <a href="/csc2025/home" className="logout">ออกจากระบบ</a>
          </div>
        </div>
          <div className='profile-con'>
          <img
                    src={`http://localhost:3001${members.Profile_picture}`}
                    alt={members.name}
                    className="profile"
                  />
          <h3>{members.Name}</h3><br></br>
        </div>
        
          <div className="series-grid-profile">
            {reviewedSeries.length > 0 ? (
              reviewedSeries.map((s) => (
                <div className="series-item-profile" key={s.Series_code}>
                  <Link to={`/seriesm/${s.Series_code}/${Member_id}`}>
                    <img
                      src={`http://localhost:3001${s.Poster}`}
                      alt={s.Thai_name}
                      className="reviewed-series-poster"
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p>ยังไม่มีรีวิว</p>
            )}
          </div>
          <Footer/>
        </div>
    </div>
    
     
  );
};

export default Profile;