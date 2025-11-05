import React, { useState }  from 'react';
import { Row, Col, Alert, Button,Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from 'components/Auth/AuthProvider';
import membersApi from 'api/membersApi';

const validationSchema=Yup.object().shape({
    email: Yup.string().email('รูปแบบอีเมลไม่ถูกต้อง').required('จำเป็นต้องกรอกอีเมล'),
    username: Yup.string().max(255).required('จำเป็นต้องกรอกชื่อผู้ใช้'),
    name: Yup.string().max(255).required('จำเป็นต้องกรอกชื่อ'),
    password: Yup.string().max(255).required('จำเป็นต้องกรอกรหัสผ่าน'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน')
      .required('จำเป็นต้องกรอกยืนยันรหัสผ่าน')
  })

const JWTSignup = () => {

  const navigate = useNavigate();
  const [profile_picture, setProfile_picture] = React.useState(null);
  const [accepted, setAccepted] = useState(false);
  
  const handleSubmit = async (values, { setSubmitting }) => {
  try {
    if (!accepted) {
      alert("กรุณายอมรับเงื่อนไขก่อนสมัครสมาชิก");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("username", values.username);
    formData.append("name", values.name);
    formData.append("password", values.password);

    if (profile_picture) {
      formData.append("profile_picture", profile_picture);
    }

    await membersApi.createMembers(formData);
    Swal.fire({
        title: 'สมัครสมาชิกสำเร็จ',
        text: 'รอการอนุมัติ',
        icon: 'success',
        confirmButtonText: 'ตกลง'
    });
    navigate("/home");
  } catch (error) {
    console.error("Error creating member:", error);
     if (error.response && error.response.status === 409) {
            Swal.fire({
                text: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว',
                icon: 'error',
                confirmButtonText: 'ลองอีกครั้ง'
            });
        } else if (error.response && error.response.status === 409) {
           Swal.fire({
                text: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว',
                icon: 'error',
                confirmButtonText: 'ลองอีกครั้ง'
            });
        } else {
            Swal.fire({
                text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ในขณะนี้',
                icon: 'error',
                confirmButtonText: 'ตกลง'
            });
        }
  } finally {
    setSubmitting(false);
  }
};
  return (
    <Formik
      initialValues={{
    email: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  }}
  validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <label className="form-label fs-6">สมัครสมาชิก</label>
          <Row>
            <Col md={6}>
            <div className="form-group mb-4">
              <label className="form-label text-start d-block">อีเมล</label>
              <input
                className="form-control"
                label="Email Address"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
              />
              {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
            </div>
            </Col>
            <Col md={6}>
            <div className="form-group mb-4">
              <label className="form-label text-start d-block">ชื่อผู้ใช้</label>
              <input
                className="form-control"
                label="Username"
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.username}
              />
              {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
            </div>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
            <div className="form-group mb-4">
              <label className="form-label text-start d-block">ชื่อ</label>
              <input
                className="form-control"
                label="Name"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.name}
              />
              {touched.name && errors.name && <small className="text-danger form-text">{errors.name}</small>}
            </div>
            </Col>
            <Col md={6}>
             <div className="form-group mb-4">
              <label className="form-label text-start d-block">รหัสผ่าน</label>
              <input
                className="form-control"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
              />
              {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
            <div className="form-group mb-4">
              <label className="form-label text-start d-block">ยืนยันรหัสผ่าน</label>
              <input
                  className="form-control"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && <small className="text-danger form-text">{errors.confirmPassword}</small>}
            </div>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formImage">
                  <label className="form-label text-start d-block">รูปโปรไฟล์</label>
                  <Form.Control type="file" onChange={(e) => setProfile_picture(e.currentTarget.files[0])} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group controlId="terms" className="d-flex justify-content-center mt-3">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    ฉันได้อ่านและยอมรับ{" "}
                    <Link to="/conditions">เงื่อนไขการใช้งาน</Link>
                  </>
                }
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
            </Form.Group>

            <Col className="d-flex justify-content-center mt-3">
              <Button
                type="submit"
                variant="success"
                disabled={isSubmitting || !accepted} 
              >
                {isSubmitting ? "กำลังบันทึก..." : "สมัครสมาชิก"}
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTSignup;
