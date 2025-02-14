import React, { useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios"




export const Login = ({ userType, userLogin, setUserData }) => {
  const navigate = useNavigate();

  const [fpassword, setfpassword] = useState("");
  const [facultyid, setfacultyid] = useState("");
  const [usn, setusn] = useState("");
  const [pmail, setpmail] = useState("");

  const goto = async(e) => {
    e.preventDefault();
    if(userType==='faculty'){
      if(fpassword==="" || facultyid===""){
        alert("Please fill all the fields!!")
        return;
      }
      else{
        try{
          const entereddata = await Axios.post("http://localhost:8000/loginFacultyData",{
            facultyid,fpassword
          })
          if(entereddata.data && entereddata.data.length>0){
            alert("Login Successful")

          }else{
            alert("Invalid Login Credentials.")
            setfpassword('')
    setfacultyid('')
            return;
          }
        }
        catch(error){
          alert("error fetching data",error)
        }

      }
    }
    
    else if(userType==='parent'){
      if(usn==="" || pmail===""){
        alert("Please fill all the fields!!")
        return;
      }else{
        try{
          const entereddata = await Axios.post("http://localhost:8000/loginParentData",{
            pmail,usn
          })
          if(entereddata.data && entereddata.data.length>0){
            alert("Login Successful")

          }else{
            alert("Invalid Login Credentials.")
            setusn('')
    setpmail('')
            return;
          }
        }
        catch(error){
          alert("error fetching data",error)
        }

      }
    }
    setUserData({ fpassword, facultyid, usn, pmail });
    setfpassword('')
    setfacultyid('')
    setusn('')
    setpmail('')

    // Redirect based on userType
    if (userType === "faculty") {
      navigate("/facultyDashboard");
    } else if (userType === "parent") {
      navigate("/parentDashboard");
    }
  };

  const renderLoginForm = () => {
    if (userType === "faculty") {
      return (
        <Form className="mb-3" onSubmit={goto}>
          <Form.Group controlId="facultyid" className="mt-3">
            <Form.Label>FacultyID</Form.Label>
            <Form.Control
              type="text"
              value={facultyid}
              onChange={(e) => setfacultyid(e.target.value)}
              placeholder="FacultyID"
              // required
            />
          </Form.Group>
          <Form.Group controlId="facultyEmail" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={fpassword}
              placeholder="Enter password"
              onChange={(e) => setfpassword(e.target.value)}
              // required
            />
          </Form.Group>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:"15px"}}>
  <Button variant="primary" type="submit" className="my-3">
    LOGIN
  </Button>

  
  <div style={{ display: "flex", alignItems: "center" }}>
    <p className="mb-0 me-2">Not Registered?</p>
    <Button className="my-3" onClick={() => navigate('/signup')}>
      SIGNUP
    </Button>
  </div>
</div>
        </Form>
      );
    } else if (userType === "parent") {
      return (
        <Form className="mb-3" onSubmit={goto}>
          <Form.Group controlId="parentEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={pmail}
              onChange={(e) => setpmail(e.target.value)}
              placeholder="Enter email"
              // required
            />
          </Form.Group>
          <Form.Group controlId="StudentUSN" className="mt-3">
            <Form.Label>Student USN</Form.Label>
            <Form.Control
              type="text"
              value={usn}
              onChange={(e) => setusn(e.target.value)}
              placeholder="Student USN"
              // required
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:"15px"}}>
  <Button variant="primary" type="submit" className="my-3">
    LOGIN
  </Button>

  
  <div style={{ display: "flex", alignItems: "center" }}>
    <p className="mb-0 me-2">Not Registered?</p>
    <Button className="my-3" onClick={() => navigate('/signup')}>
      SIGNUP
    </Button>
  </div>
</div>
        </Form>
      );
    }
  };

  return (
    <Container style={{border:"2px solid blue", borderRadius:"10px",marginTop:"30px",paddingBottom:"20px"}}
    // className="border border-primary mt-5 p-2 rounded "
    >
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="text-center">LOGIN</h2>
          <div className="d-flex justify-content-between mb-4 mt-3">
            <Button className="btn-success" onClick={() => userLogin("faculty")}>Faculty Login</Button>
            <Button className="btn-success" onClick={() => userLogin("parent")}>Parent Login</Button>
          </div>
          
{renderLoginForm()}


        </Col>
      </Row>
    </Container>
  );
};
