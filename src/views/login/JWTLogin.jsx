import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Navigate, useNavigate,Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import { useAuth } from 'components/Auth/AuthProvider';
import loginApi from 'api/loginApi';
const JWTLogin = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
       username: Yup.string().max(255).required('จำเป็นต้องมีชื่อผู้ใช้'),
       password: Yup.string().max(255).required('จำเป็นต้องมีรหัสผ่าน')
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
  try {
    const response = await loginApi.checklogin(values);
    const {Member_id, username}= response.data.member;
    login({Member_id, username});
    navigate(`/HomeMember/${Member_id}`);
    
} catch (error) {
    console.error(error);
    if (error.response && error.response.status === 401) {
        Swal.fire({
            text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
            icon: 'error',
            confirmButtonText: 'ลองอีกครั้ง'
        });
    } else if (error.response && error.response.status === 403) {
        Swal.fire({
            text: 'บัญชีนี้ไม่สามารถเข้าสู่ระบบได้',
            icon: 'warning',
            confirmButtonText: 'ตกลง'
        });
    } else {
        Swal.fire({
            text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ในขณะนี้',
            icon: 'error',
        });
    }
} finally {
    setSubmitting(false);
  }
}}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <label className="form-label fs-6">เข้าสู่ระบบ</label>
          <div className="form-group mb-3">
            <label className="form-label text-start d-block">ชื่อผู้ใช้</label>
            <input
              className="form-control"
              label="Email Address / Username"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.username}
            />
            {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
          </div>
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


          {errors.submit && (
            <Col sm={12}>
              <Alert>{errors.submit}</Alert>
            </Col>
          )}
          <Row>
            <p style={{ textAlign: "right"}}>
              <Link to="/forgetpassword">ลืมรหัสผ่าน?</Link>
            </p>
          </Row>
          <Row>
            <Col mt={2}>
              <Button className="btn-block mb-4" style={{ color: "white" }}  disabled={isSubmitting} size="large" type="submit" variant="success">
                เข้าสู่ระบบ
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
