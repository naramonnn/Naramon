import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate, useParams,Link } from "react-router-dom";
import './index.css';
import Footer from "views/footer";

const validationSchema = Yup.object().shape({
  Comment: Yup.string().required("กรุณาเพิ่มข้อความ"),
  Score: Yup.number().required("กรุณาให้คะแนน").min(1, "กรุณาเลือกอย่างน้อย 1 ดาว"),
});

const EditReview = () => {
  const { Series_code, Member_id,Review_code } = useParams();
  const navigate = useNavigate();
  const [hover, setHover] = useState(0);
  const [series, setSeries] = useState({});
  const [reviews, setReviews] = useState({});
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/series/${Series_code}`)
      .then((res) => {
        setSeries(res.data);
      })
      .catch((err) => console.error(err));
  }, [Series_code]);
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/reviews/${Review_code}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.error(err));
  }, [Review_code]);

  
    useEffect(() => {
      axios.get(`http://localhost:3001/members/${Member_id}`)
        .then((res) => {setMembers(res.data); })
        .catch((err) => console.error(err));
    }, [Member_id]);
    
   const search = () => {
    navigate(`/SearchSeries/${Member_id}`); 
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = {
        Comment: values.Comment,
        Score: values.Score,
        Series_code,
        Member_id,
        Date: `${new Date().toISOString().split("T")[0]} ${new Date().toTimeString().slice(0, 5)}`,
      };

      await axios.put(`http://localhost:3001/reviews/${Review_code}`,formData, {
        headers: { "Content-Type": "application/json" },
      });
      Swal.fire({
          title: 'บันทึกสำเร็จ',
          text: 'แก้ไขรีวิวซีรีส์เรียบร้อยแล้ว',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        });
      navigate(`/seriesm/${Series_code}/${Member_id}`);
    } catch (error) {
      console.error("Error creating reviews:", error);
      Swal.fire({
          title: 'บันทึกไม่สำเร็จ',
          text: 'เกิดข้อผิดพลาดในการแก้ไขรีวิว',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
    } finally {
      setSubmitting(false);
    }
  };

  return (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Formik
                  initialValues={{ Comment: reviews.Comment, Score:reviews.Score }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit} enableReinitialize
                >
                  {({
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Row>
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
                        <p className="titel">แก้ไขรีวิว</p>
                      <div className="poster-wrapper text-center">
                          <img
                            className="poster"
                            src={`http://localhost:3001${series.Poster}`}
                            alt={series.English_name}
                            style={{ maxHeight: "250px", borderRadius: "12px" }}
                            
                          />
                          <div className="poster-info">
                            <h4>{series.English_name}</h4>
                            <h5>{series.Thai_name}</h5>
                            
                          </div>
                        </div>
                        <hr style={{ width:"95%", marginLeft:"30px", margin:"20px" }} />

                        <Col className="text-center">
                          <p className="score">ให้คะแนน</p>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              style={{
                                cursor: "pointer",
                                fontSize: "2rem",
                                color:
                                  star <= (hover || values.Score)
                                    ? "#ffc107"
                                    : "#ccc",
                              }}
                              onClick={() => {
                                setFieldValue("Score", star);
                                console.log("คะแนนที่เลือก:", star);
                              }}
                              onMouseEnter={() => setHover(star)}
                              onMouseLeave={() => setHover(values.Score)}
                            >
                              ★
                            </span>
                          ))}
                          {touched.Score && errors.Score && (
                            <div className="text-danger">{errors.Score}</div>
                          )}
                        </Col>
                        

                        <Col md={12} className="mt-3">
                          <Form.Group controlId="formComment">
                            <Form.Label>รีวิว</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows="3"
                              name="Comment"
                              value={values.Comment}
                              onChange={handleChange}
                              isInvalid={touched.Comment && !!errors.Comment}
                              placeholder="เขียนรีวิวของคุณ..."
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.Comment}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="d-flex justify-content-center mt-3">
                          <Button
                            type="submit"
                            variant="success"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate(`/seriesm/${Series_code}/${Member_id}`)}
                            className="ms-2"
                          >
                            ยกเลิก
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
              <Footer/>
            </Card>
          </Col>
        </Row>
  
  );
};

export default EditReview;