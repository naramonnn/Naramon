import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './index.css';
import Footer from "views/footer";


const SeriesDetail = () => {
  const { Series_code} = useParams();
  const [series, setSeries] = useState(null);
  const [actors, setActors] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/series/${Series_code}`)
      .then((res) => setSeries(res.data))
      .catch((err) => console.error(err));
  }, [Series_code]);

  useEffect(() => {
    axios.get(`http://localhost:3001/actors/series/${Series_code}`)
      .then((res) => setActors(res.data))
      .catch((err) => console.error(err));
  }, [Series_code]);

    useEffect(() => {
    axios.get(`http://localhost:3001/reviews/reviews/${Series_code}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [Series_code]);

  if (!series) return <p>Loading...</p>;

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="background">
          <img src={`http://localhost:3001${series.Background}`} alt={series.English_name} />
        </div>
        <div className="series-card">
          <img className="poster" src={`http://localhost:3001${series.Poster}`} alt={series.English_name} />
        <div className="series-details">
          <h2 className="englishname">{series.English_name}</h2>
          <h3>{series.Thai_name}</h3><br></br>
          <p>{series.Synopsis}</p><br></br>
          <p className="details">
            {`จำนวนตอน: ${series.Number_of_episodes}`}<br></br>
            {`ช่องทางรับชม: ${series.Viewing_Channels}`}<br></br>
            {`หมวดหมู่ซีรีส์: ${series.CategorySeries_name}`}<br></br>
            {`ผู้กำกับ: ${series.Director}`}<br></br>
            {`สถานีโทรทัศน์ที่ฉาย: ${series.TVStations}`}
          </p>
          <h5>ตัวอย่างซีรีส์</h5>
          {series?.Trailer && (
          <div className="video-container">
            <iframe
            className="video-container"
              width="560"
              height="315"
              src={series.Trailer.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          )}
          <h5>นักแสดงนำ</h5>
          {actors && actors.map((actor, index) => (
            <div key={index} className="actors">
              <img 
                src={`http://localhost:3001${actor.ActorPhoto1}`} 
                alt={actor.ActorName} 
                
              />
              <p className="name">{`${actor.ActorName1} รับบทเป็น ${actor.RolesPlayed1}`}</p>
              <p className="information">{actor.ActorInformation1}</p>
              <img 
                src={`http://localhost:3001${actor.ActorPhoto2}`} 
                alt={actor.ActorName} 
                
              />
              <p className="name">{`${actor.ActorName2} รับบทเป็น ${actor.RolesPlayed2}`}</p>
              <p className="information">{actor.ActorInformation2}</p>
            </div>
          ))}
        <h5>รีวิว</h5>
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <img
                    src={`http://localhost:3001${review.profile_picture}`}
                    alt={review.Name}
                    className="review-avatar"
                  />

                  <div className="review-content">
                    <p className="review-name">{review.Name}</p>
                    <span className="review-date">
                      {new Date(review.Date).toLocaleString("th-TH")}
                    </span>
                    <div className="stars">{"★".repeat(review.Score)}</div>
                    <p className="review-comment">{review.Comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                ยังไม่มีรีวิวสำหรับซีรีส์เรื่องนี้
              </p>
            )}

        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default SeriesDetail;