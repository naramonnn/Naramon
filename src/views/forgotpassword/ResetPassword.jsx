import { useState } from "react";
import axios from "axios";
import "./ResetPassword.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik } from "formik";
import * as Yup from "yup";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required("จำเป็นต้องกรอกรหัสผ่านใหม่"),
    confirmPassword: Yup.string()
      .required("จำเป็นต้องกรอกยืนยันรหัสผ่าน")
      .oneOf([Yup.ref("newPassword"), null], "รหัสผ่านไม่ตรงกัน"),
  });

  const handleResetSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post("http://localhost:3001/members/reset-password", {
        token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      if (res.data.success) {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          text: "ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "ผิดพลาด",
          text: res.data.message || "ไม่สามารถตั้งรหัสผ่านใหม่ได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      Swal.fire({
        title: "บันทึกไม่สำเร็จ",
        text: "เกิดข้อผิดพลาดในการตั้งรหัสผ่านใหม่",
        icon: "error",
        confirmButtonText: "ตกลง",

      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ newPassword: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleResetSubmit} 
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <div className="reset-container">
          <Form className="reset-form" noValidate onSubmit={handleSubmit}>
            <p className="label-reset">ตั้งรหัสผ่านใหม่</p>

            <label className="label-text-reset">รหัสผ่านใหม่</label>
            <input
              type="password"
              name="newPassword"
              placeholder="กรุณากรอกรหัสผ่านใหม่"
              value={values.newPassword}
              onChange={handleChange}
              className={
                errors.newPassword && touched.newPassword ? "is-invalid" : ""
              }
              required
            />
            {errors.newPassword && touched.newPassword && (
              <div className="invalid-feedback">{errors.newPassword}</div>
            )}

            <label className="label-text-reset">ยืนยันรหัสผ่านใหม่</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="กรุณากรอกยืนยันรหัสผ่านใหม่"
              value={values.confirmPassword}
              onChange={handleChange}
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? "is-invalid"
                  : ""
              }
              required
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}

            <Button
              type="submit"
              variant="success"
              className="btn-reset"
              disabled={isSubmitting}
            >
              ตกลง
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default ResetPassword;
