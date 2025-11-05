import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import membersApi from 'api/membersApi';
import { useAuth } from 'components/Auth/AuthProvider';
const validationSchema = Yup.object().shape({
  name: Yup.string().required('กรุณากรอกชื่อ'),
  email: Yup.string().email('รูปแบบอีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล'),
  //password: Yup.string().required('กรุณากรอกรหัสผ่าน'),
});
const SignUp1 = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = React.useState(null);
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('Email', values.Email);
      formData.append('Username', values.Username);
      formData.append('Name', values.Name);
      formData.append('Password', values.Password);
      if (file) {
        formData.append('Profile_picture', Profile_picture);
      }
      await membersApi.createMembers(formData);
        navigate('/users'); // ย้ายไปหน้าแสดงรายการผู้ใช้
      } catch (error) {
        console.error('Error creating user:', error);
        alert('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้');
      } finally {
        setSubmitting(false);
      }
    };
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon" />
                  </div>
                  <h3 className="mb-4">สมัครสมาชิก</h3>
                  <Formik initialValues={{ Email: '', Username: ''}} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
                      <form onSubmit={handleSubmit} encType="multipart/form-data">
                       
                        <Form.Group className="mb-3" controlId="formEnglish_name">
                          <Form.Label>ชื่อภาษาอังกฤษ</Form.Label>
                          <Form.Control
                            type="text"
                            name="English_name"
                            value={values.English_name}
                            onChange={handleChange}
                            isInvalid={touched.English_name && !!errors.English_name}
                            placeholder="กรุณากรอกข้อมูล"
                          />
                          <Form.Control.Feedback type="invalid">{errors.English_name}</Form.Control.Feedback>
                        </Form.Group>
                  

                       
                        <Form.Group className="mb-3" controlId="formEnglish_name">
                          <Form.Label>ชื่อภาษาอังกฤษ</Form.Label>
                          <Form.Control
                            type="text"
                            name="English_name"
                            value={values.English_name}
                            onChange={handleChange}
                            isInvalid={touched.English_name && !!errors.English_name}
                            placeholder="กรุณากรอกข้อมูล"
                          />
                          <Form.Control.Feedback type="invalid">{errors.English_name}</Form.Control.Feedback>
                        </Form.Group>
                     
                        
                        <Form.Group className="mb-3" controlId="formEnglish_name">
                          <Form.Label>ชื่อภาษาอังกฤษ</Form.Label>
                          <Form.Control
                            type="text"
                            name="English_name"
                            value={values.English_name}
                            onChange={handleChange}
                            isInvalid={touched.English_name && !!errors.English_name}
                            placeholder="กรุณากรอกข้อมูล"
                          />
                          <Form.Control.Feedback type="invalid">{errors.English_name}</Form.Control.Feedback>
                        </Form.Group>
                      

                       
                        <Form.Group className="mb-3" controlId="formEnglish_name">
                          <Form.Label>ชื่อภาษาอังกฤษ</Form.Label>
                          <Form.Control
                            type="text"
                            name="English_name"
                            value={values.English_name}
                            onChange={handleChange}
                            isInvalid={touched.English_name && !!errors.English_name}
                            placeholder="กรุณากรอกข้อมูล"
                          />
                          <Form.Control.Feedback type="invalid">{errors.English_name}</Form.Control.Feedback>
                        </Form.Group>
                      

                        
                        <Form.Group className="mb-3" controlId="formEnglish_name">
                          <Form.Label>ชื่อภาษาอังกฤษ</Form.Label>
                          <Form.Control
                            type="text"
                            name="English_name"
                            value={values.English_name}
                            onChange={handleChange}
                            isInvalid={touched.English_name && !!errors.English_name}
                            placeholder="กรุณากรอกข้อมูล"
                          />
                          <Form.Control.Feedback type="invalid">{errors.English_name}</Form.Control.Feedback>
                        </Form.Group>
                    
                        
                        <Form.Group className="mb-3" controlId="formImage">
                          <Form.Label>รูปภาพพื้นหลัง</Form.Label>
                          <Form.Control type="file" multiple onChange={(e) => setBackground(e.currentTarget.files[0])} />
                        </Form.Group>
                     

                        
                                    <button className="btn btn-primary mb-4">สมัครสมาชิก</button>
                                    <p className="mb-2">
                                      มีบัญชีอยู่แล้วใช่ไหม?{' '}
                                      <NavLink to={'/login'} className="f-w-400">
                                        Login
                                      </NavLink>
                                    </p>
                                    </form>
                    )}
                  </Formik>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;
