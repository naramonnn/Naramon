import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import membersApi from "api/membersApi";
import { useParams } from "react-router-dom";
import './profile.css'
import Footer from "views/footer";

const EditProfile = () => {
  const { Member_id } = useParams();
  const [members, setMembers] = useState([]);
  const [profile, setProfile] = useState({});
  const [file, setFile] = useState(null);
  const [showName, setShowName] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempImage, setTempImage] = useState(null);

   useEffect(() => {
      axios.get(`http://localhost:3001/members/${Member_id}`)
        .then((res) => setMembers(res.data))
        .catch((err) => console.error(err));
    }, [Member_id]);
 
  const getMembers = async () => {
    try {
      const response = await membersApi.getMembers(Member_id);
      const data = response.data;

      
      setProfile({
        name: data.Name,
        username: data.UserName,
        email: data.Email,
        image: data.Profile_picture || ""
      });

      setFile(data.Profile_picture);
      console.log("สมาชิกที่ดึงมา:", data);
    } catch (err) {
      console.error("Load members failed", err);
    }
  };

  useEffect(() => {
    getMembers(); 
  }, [Member_id]);

  
  const saveName = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/members/${Member_id}`, {
        name: tempName
      });

      setProfile((prev) => ({ ...prev, name: res.data.name }));
      setShowName(false);
    } catch (err) {
      console.error("Error updating name:", err);
    }
  };

 
  const saveImage = async () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    if (tempImage) {
      formData.append("image", tempImage);
    }

    try {
      const res = await axios.put(
        `http://localhost:3001/members/${Member_id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProfile((prev) => ({
        ...prev,
        image: res.data.profile_picture
      }));

      setShowImage(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="home-container-p">
      <div className="home-content-p">
        <Card className="p-4 text-center mx-auto" style={{ maxWidth: 450, margin: "30px"}}>
          <img
            src={`http://localhost:3001${members.Profile_picture}` || "https://placehold.co/200x200"}
            alt="profile"
            className="rounded-circle object-fit-cover mx-auto mb-3"
            style={{ width: 150, height: 150 }}
          />
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowImage(true)}
          >
            แก้ไขรูปภาพ
          </Button>

          <div className="text-start mt-4">
            <div className="d-flex justify-content-between border-bottom py-2 align-items-center">
              <span>ชื่อ</span>
              <span>{profile.name}</span>
              <Button
                variant="link"
                className="p-0"
                onClick={() => {
                  setTempName(profile.name);
                  setShowName(true);
                }}
              >
                แก้ไข
              </Button>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <span>ชื่อผู้ใช้</span>
              <span>{profile.username}</span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <span>อีเมล</span>
              <span>{profile.email}</span>
            </div>
          </div>

          <Modal show={showName} onHide={() => setShowName(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>แก้ไขชื่อ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="พิมพ์ชื่อใหม่"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={saveName}>
                บันทึก
              </Button>
              <Button variant="secondary" onClick={() => setShowName(false)}>
                ยกเลิก
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showImage} onHide={() => setShowImage(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>แก้ไขรูปภาพ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setTempImage(e.target.files?.[0] || null)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={saveImage}>
                บันทึก
              </Button>
              <Button variant="secondary" onClick={() => setShowImage(false)}>
                ยกเลิก
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>
      </div>
      <Footer />
    </div>
    
  );
};

export default EditProfile;