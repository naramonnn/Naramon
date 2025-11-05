
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { Button} from 'react-bootstrap';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import Footer from "views/footer";

const SeriesDetailM = () => {
  const { Series_code,Member_id } = useParams();
  const [reviews, setReviews] = useState(null);
  const [series, setSeries] = useState(null);
  const [actors, setActors] = useState(null);
  const [members, setMembers] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const currentMemberId = Member_id;
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState([]); 
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [reportedMemberId, setReportedMemberId] = useState(null); 
  const [reportReviewId, setReportReviewId] = useState(null);
  const [report_at, setReport_at] = useState([]);


  const navigate = useNavigate();
    const handleClickAddReview = (Series_code) => {
      navigate(`/review/${Series_code}/${Member_id}`);
    };

    const search = () => {
      navigate(`/SearchSeries/${Member_id}`); 
    };

  useEffect(() => {
    axios.get(`http://localhost:3001/series/${Series_code}`)
      .then((res) => setSeries(res.data))
      .catch((err) => console.error(err));
  }, [Series_code]);

   useEffect(() => {
    axios.get('http://localhost:3001/members')
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

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
  
  
    useEffect(() => {
      axios.get(`http://localhost:3001/members/${Member_id}`)
        .then((res) => setMembers(res.data))
        .catch((err) => console.error(err));
    }, [Member_id]);

    useEffect(() => {
      axios.get('http://localhost:3001/report_type')
        .then((res) => setReportType(res.data))
        .catch((err) => console.error("Error fetching report types:", err));
    }, []);
  
     const toggleReason = (code) => {
    setSelectedReasons(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const handleReportClick = (Review_code, Member_id) => {
  setSelectedReasons([]);
  setSubmissionStatus(null);
  setIsReportModalOpen(true);
  setReportedMemberId(Member_id);
  setReportReviewId(Review_code);
  setReport_at(new Date().toISOString()); 
};


const handleSubmitReport = async () => {
  if (selectedReasons.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "กรุณาเลือกเหตุผล",
      text: "กรุณาเลือกเหตุผลในการรายงานอย่างน้อย 1 ข้อ",
      confirmButtonColor: "#dc3545",
      confirmButtonText: 'ตกลง',
    });
    return;
  }

  setIsSubmitting(true);

  try {
   const payload = {
      Member_id: reportedMemberId,   
      Reporter_id: currentMemberId,  
      Review_code: reportReviewId,
      Series_code: Series_code,
      selectedReasons: Array.isArray(selectedReasons)
        ? selectedReasons
        : [selectedReasons],
      Report_at: new Date().toISOString(),
    };

    const res = await axios.post("http://localhost:3001/report", payload);

    Swal.fire({
      icon: "success",
      text: "รายงานสำเร็จ",
      confirmButtonText: 'ตกลง',
    });

    setSubmissionStatus("success");
    setIsReportModalOpen(false);
  } catch (err) {
    Swal.fire({
      icon: "warning",
      title: "ไม่สามารถรายงานได้",
      text: err.response?.data?.message || "เนื่องจากคุณได้รายงานไปแล้ว",
      confirmButtonText: 'ตกลง',
      confirmButtonColor: "#dc3545",
    });
    setSubmissionStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};




const handleDeleteReview = async (Review_code) => {
  const result = await Swal.fire({
    title: "ยืนยันการลบ",
    text: "คุณต้องการลบรีวิวนี้ใช่หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ใช่",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    try {
      await fetch(`http://localhost:3001/reviews/${Review_code}`, {
        method: "DELETE",
      });

      setReviews((prev) => prev.filter((r) => r.Review_code !== Review_code));

      Swal.fire({
        text: "รีวิวถูกลบเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });
    } catch (error) {
      console.error("Delete failed:", error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบรีวิวได้",
        icon: "error",
      });
    }
  }
};

  if (!series) return <p>Loading...</p>;

 

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
        <div className="background">
          <img src={`http://localhost:3001${series.Background}`} alt={series.English_name} />
        </div>
        <div className="series-card">
          <div className="poster-wrapper">
              <img className="poster" src={`http://localhost:3001${series.Poster}`} alt={series.English_name} />
              <Button className="btnaddseries" onClick={() => handleClickAddReview(series.Series_code)}>เพิ่มรีวิวซีรีส์</Button>
          </div>
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

                  <div
                    className="hamburger"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    ☰
                    <div className={`dropdown ${openIndex === index ? "show" : ""}`}>
                      {String(review.Member_id) === String(currentMemberId) ? (
                        <>
                          <a
                            href={`/csc2025/edit-review/${Series_code}/${Member_id}/${review.Review_code}`}
                          >
                            แก้ไข
                          </a>
                          <a onClick={() => handleDeleteReview(review.Review_code)}>ลบ</a>
                        </>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleReportClick(review.Review_code, review.Member_id);
                          }}
                        >
                          รายงาน
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                ยังไม่มีรีวิวสำหรับซีรีส์เรื่องนี้
              </p>
            )}

            <Modal show={isReportModalOpen} onHide={() => setIsReportModalOpen(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>รายงานความไม่เหมาะสมของรีวิว</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="reasons">
                  {reportType.length > 0 ? (
                    reportType.map((reason) => (
                      <label key={reason.Report_Type_code} className="reason-item">
                        <input
                          type="checkbox"
                          checked={selectedReasons.includes(reason.Report_Type_code)}
                          onChange={() => toggleReason(reason.Report_Type_code)}
                        />
                        {reason.Report_Type_name}
                      </label>
                    ))
                  ) : (
                    <p>กำลังโหลดข้อมูล...</p>
                  )}
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsReportModalOpen(false)}>
                  ยกเลิก
                </Button>
                <Button
                  variant="danger"
                  onClick={handleSubmitReport}
                  disabled={isSubmitting || selectedReasons.length === 0}
                >
                  {isSubmitting ? 'กำลังบันทึก...' : 'รายงาน'}
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
        
        </div>
        </div>
      <Footer/>
    </div>
    
  );
}

export default SeriesDetailM;