import './index.css'
import { useEffect, useState } from "react";
import MySwiper from 'views/swiper';
import { Link } from "react-router-dom";
import Footer from 'views/footer';

const Home = () => {
  const [dramaSeries, setDramaSeries] = useState([]);
  const [romanticSeries, setRomanticSeries] = useState([]);
  const [thrillerSeries, setThrillerSeries] = useState([]);
  const [actionSeries, setActionSeries] = useState([]);
 
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
        <MySwiper />
        <h4>ซีรีส์</h4>

        <h5 className="category-title">โรแมนติก</h5>
        <div className="series-grid">
          {romanticSeries.map((item) => (
            <div className="series-item" key={item.Series_code}>
              <Link to={`/series/${item.Series_code}`}>
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
            <div className="series-item" key={item.Series_code}>
              <Link to={`/series/${item.Series_code}`}>
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
            <div className="series-item" key={item.Series_code}>
              <Link to={`/series/${item.Series_code}`}>
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
            <div className="series-item" key={item.Series_code}>
              <Link to={`/series/${item.Series_code}`}>
                <img
                  src={`http://localhost:3001${item.Poster}`}
                  alt={item.English_name}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )

};

export default Home;