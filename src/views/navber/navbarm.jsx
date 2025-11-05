import React,{useState, useEffect} from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Link , useParams} from "react-router-dom";
import axios from "axios";

function Navbarm () {
  const { Member_id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    if (Member_id) {
      axios.get(`http://localhost:3001/members/${Member_id}`)
        .then((res) => {setMember(res.data);})
        .catch((err) => console.error(err));
    }
  }, [Member_id]);

  const navigate = useNavigate();
  const search = () => {
    navigate('/search');
  };

  return (
    <nav className="navbar">
        <Link to={`/HomeMember/${member.Member_id}`} key={member.Member_id}>
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

          <Link to={`/profile/${member.Member_id}`} key={member.Member_id}>
            <img
              src={`http://localhost:3001${member.Profile_picture}`}
              alt={member.name}
              className="profile-picture"
            />
          </Link>
        </div>
      </nav>
  );
};

export default Navbarm;