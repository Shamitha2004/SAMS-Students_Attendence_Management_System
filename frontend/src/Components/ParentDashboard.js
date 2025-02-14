import React from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import academic from '../Assets/academic.png'
import extracurricularactivities from '../Assets/extracurricularactivities.png'
import senddata from '../Assets/senddata.png'
import AcademicsPage from '../SubComponents/AcademicsPage';

export const ParentDashboard = ({logout}) => {
const navigate=useNavigate();

  // const handlelogout=()=>{
  //   logout();
  //   navigate('/')
  // }

  const user=JSON.parse(localStorage.getItem("LoginData"))
const username=user?.pmail?  user.pmail : "parent"

  return (
    <>
    <Header logout={logout}/>
    <h3 className="text-center mt-5 mb-5">
        Welcome {username}
      </h3>
      
      <Container>
        <div className="d-flex justify-content-around ">
          <Button
            variant="dark"
            size="lg"
            className="mr-5"
            onClick={() => navigate("/academicspage")}
          >
            Academic Stats
          </Button>
          <Button
            variant="danger"
            size="lg"
            className="mr-5"
            onClick={() => navigate("/iaattendance")}
          >
            IA / Attendance
          </Button>
          <Button
            variant="warning"
            size="lg"
            onClick={() => navigate("/extracurricularpage")}
          >
            ExtraCurricular Activities
          </Button>
          <Button
            variant="success"
            size="lg"
            onClick={() => navigate("/notifyfacultycard")}
          >
            Contact Faculty
          </Button>
        </div>
      </Container>
      
    </>
  )
}