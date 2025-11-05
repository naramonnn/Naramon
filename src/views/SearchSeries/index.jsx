import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, InputGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import './index.css';
import { Link, useParams } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
import Footer from "views/footer";

function SearchSeries() {
  const { Member_id } = useParams();
  const [searchText, setSearchText] = useState("");
  const [series, setSeries] = useState([]);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`http://localhost:3001/members/${Member_id}`)
      .then((res) => {
                setMembers(res.data);
                console.log(res.data.Profile_picture); 
            })
      .catch((err) => console.error(err));
  }, [Member_id]);

   useEffect(() => {
    axios.get('http://localhost:3001/series?name=' +searchText)
      .then((res) => setSeries(res.data))
      .catch((err) => console.error(err));
  }, []);
   const search = () => {
    navigate(`/SearchSeries/${Member_id}`); 
  };

  const handlePopularSearch = () => {
        navigate(`/SearchPopular/${Member_id}`); 
  };
  const handleRomanticSearch = () => {
        navigate(`/SearchRomantic/${Member_id}`); 
  };
  const handleDramaSearch = () => {
        navigate(`/SearchDrama/${Member_id}`); 
  };
  const handleThrillerSearch = () => {
        navigate(`/SearchThriller/${Member_id}`); 
  };
  const handleActionSearch = () => {
        navigate(`/SearchAction/${Member_id}`); 
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
        <Form onSubmit={(e) => {e.preventDefault(); }}>
          <InputGroup className="Search">
            <InputGroup.Text>
              <FiSearch />
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="ค้นหา"
            />
          </InputGroup>
        </Form>

        <div className='btns-s'>
          <button 
              onClick={handlePopularSearch} 
              className='btn-s' 
          >
              ⭐ ซีรีส์ที่ได้รับความนิยม 5 อันดับแรก
          </button>
          <button 
              onClick={handleRomanticSearch} 
              className='btn-s' 
          >
              โรแมนติก
          </button>
          <button 
              onClick={handleDramaSearch} 
              className='btn-s' 
          >
              ดราม่า
          </button>
          <button 
              onClick={handleThrillerSearch} 
              className='btn-s' 
          >
              ระทึกขวัญ
          </button>
          <button 
              onClick={handleActionSearch} 
              className='btn-s' 
          >
              แอคชั่น
          </button>

        </div>
          
         <div className="series-grids">
           {(() => {
              const lowerSearchText = searchText.toLowerCase();

              if (lowerSearchText === '') {
                return null;
              }

              const filteredSeries = series.filter(
                (item) =>
                  item.English_name.toLowerCase().includes(lowerSearchText) ||
                  item.Thai_name.toLowerCase().includes(lowerSearchText)
              );

              if (filteredSeries.length === 0) {
                return <p style={{ textAlign: 'center', marginTop: '20px' }}>ไม่พบข้อมูล</p>;
              }
              return filteredSeries.map((item) => (
                <div className="series-items" key={item.Series_code}>
                  <Link to={`/seriesm/${item.Series_code}/${members.Member_id}`} key={item.Series_code}>
                    <img
                      src={`http://localhost:3001${item.Poster}`}
                      alt={item.English_name}
                    />
                  </Link>
                </div>
              ));
            })()}
         </div>
      </div>
      <Footer/>
    </div>
  );
}

export default SearchSeries;