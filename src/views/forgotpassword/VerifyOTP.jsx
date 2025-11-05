import { useState, useEffect } from "react";
import axios from "axios";
import "./VerifyOTP.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Formik } from "formik";
import * as Yup from "yup";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("resetEmail");

  const [timer, setTimer] = useState(0);
  
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("กรุณากรอกรหัส OTP")
      .matches(/^\d{6}$/, "รหัส OTP ต้องเป็นตัวเลข 6 หลัก"),
  });

  const handleResendOTP = async () => {
    try {
      const res = await axios.post("http://localhost:3001/members/resend-otp", { email });
      if (res.data.success) {
        Swal.fire({
          title: "ส่งรหัสใหม่เรียบร้อยแล้ว",
          text: "กรุณาตรวจสอบอีเมลของคุณอีกครั้ง",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        setTimer(60);
      } else {
        Swal.fire({
          title: "ไม่สามารถส่งรหัสได้",
          text: res.data.message || "กรุณาลองใหม่อีกครั้ง",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "ผิดพลาด",
        text: "เกิดข้อผิดพลาดในการส่งรหัสใหม่",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await axios.post("http://localhost:3001/members/verify-otp", {
            email,
            otp: values.otp,
            
          });

          if (res.data.success) {
            Swal.fire({
              title: "ยืนยันรหัส OTP สำเร็จ",
              text: "ไปทที่หน้าตั้งรหัสผ่านใหม่",
              icon: "success",
              confirmButtonText: "ตกลง",
            });
            navigate("/ResetPassword", { state: { token: res.data.token } });
          } else {
            Swal.fire({
              text: "รหัส OTP ไม่ถูกต้อง หรือหมดอายุแล้ว",
              icon: "error",
              confirmButtonText: "ตกลง",
            });
          }
        } catch (err) {
          console.error(err);
          Swal.fire({
            text: "เกิดข้อผิดพลาดในการยืนยัน OTP",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
        <div className="verify-container">
          <Form onSubmit={handleSubmit} className="verify-form">
            <h4 className="label-otp">กรอกรหัส OTP</h4>
            <label className="label-text-otp">รหัส OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="กรุณากรอกรหัส OTP"
              value={values.otp}
              onChange={handleChange}
              className={touched.otp && errors.otp ? "input-error" : ""}
            />
            {touched.otp && errors.otp && (
              <div className="error-text">{errors.otp}</div>
            )}

            <div className="button-group">
              <Button
                type="submit"
                variant="success"
                className="btn-otp"
                disabled={isSubmitting}
              >
                {isSubmitting ? "กำลังตรวจสอบ..." : "ตกลง"}
              </Button>

              <Button
                variant="outline-success"
                className="btn-resend"
                onClick={handleResendOTP}
                disabled={timer > 0}
              >
                {timer > 0 ? `ขอรหัสใหม่ได้อีกใน ${timer}s` : "ขอรหัสอีกครั้ง"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default VerifyOTP;
