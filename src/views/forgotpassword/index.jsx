import React from "react";
import axios from "axios";
import "./index.css"; 
import { useNavigate } from 'react-router-dom';
import {Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';

function ForgotPassword() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("อีเมลไม่ถูกต้อง").required("จำเป็นต้องมีอีเมล"),
  });

  const handleForgotPassword = async (values, { setSubmitting }) => {
    try {
      await axios.post("http://localhost:3001/members/forgot-password", { email: values.email });
      Swal.fire({
                text: 'ส่งรหัส OTP ไปยังอีเมลของคุณแล้ว',
                icon: 'success',
                confirmButtonText: 'ตกลง',
              });
      navigate("/VerifyOTP", { state: { email: values.email } });
    } catch (err) {
      console.error(err);
      Swal.fire({
                text: 'ไม่สามารถส่งรหัส OTP ได้',
                icon: 'error',
                confirmButtonText: 'ตกลง',
              });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleForgotPassword}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <div className="forgot-container">
          <div className="forgot-form">
            <p className="label-forgot">ลืมรหัสผ่าน</p>
            <Form noValidate onSubmit={handleSubmit}>
              <label className="label-text-forgot">อีเมล</label>
              <input
                type="email"
                name="email"
                placeholder="กรุณากรอกอีเมล"
                value={values.email}
                onChange={handleChange}
                className={errors.email && touched.email ? "is-invalid" : ""}
                required
              />
              {errors.email && touched.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}

              <Button 
                type="submit" 
                variant="success" 
                className="btn-forgot"
                disabled={isSubmitting}
              >
                ตกลง
              </Button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default ForgotPassword;
