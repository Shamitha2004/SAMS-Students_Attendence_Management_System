import React, { useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios"


export const Signup = () => {
  const navigate = useNavigate();
  const userType=JSON.parse(localStorage.getItem("UserType"))

  const [fname,setfname]=useState("")
const [femail,setfemail]=useState("")
const [fpassword, setfpassword] = useState("");
const [facultyid, setfacultyid] = useState("");
const [usn, setusn] = useState("");
const [pmail, setpmail] = useState("");
const [ppassword,setppassword]=useState("")
const [pcontact,setpcontact]=useState(null)
const [facultyData,setfacultyData]=useState("")
const [parentData,setparentData]=useState("")

const savedetails=async(e)=>{
  e.preventDefault();
  if(userType==="faculty"){
    if(fname==="" || femail==="" || fpassword==="" || facultyid===""){
      alert("Please fill all the fields!!")
      return
    }else{
      setfacultyData({fname,femail,fpassword,facultyid})
      try{

         await Axios.post("http://localhost:8000/createfaculty",{
          fname,femail,fpassword,facultyid
        })
        alert("Faculty Registered Successfully!!")
      }
      catch(error){
        console.log("Error creating faculty",error)
        alert("Failed to register faculty")
      }

//       Axios.post("http://localhost:8000/createfaculty",parentData)
//       .then(()=>{
//         console.log("success")
//       })
//       .catch(()=>{
// console.log("Error")
//       })
    }
  }else if(userType==="parent"){
    if(pmail==="" || usn==="" || ppassword==="" || pcontact===null || pcontact===""){
      alert("Please fill all the fields")
      return
    }else{
      setparentData({pmail,usn,ppassword,pcontact})
      try{
      await Axios.post("http://localhost:8000/createparent",{
        pmail,ppassword,usn,pcontact
      })
      alert("Parent Registered Successfully!!")
      }
      catch(error){
        console.log("Error creating parent",error)
        alert("Failed to register faculty")
      }
    }
  }

  setfname('')
  setfemail('')
  setfpassword('')
  setfacultyid('')
  setpmail('')
  setppassword('')
  setusn('')
  setpcontact('')
  navigate('/')
  }

  
  const rendersignupform=()=>{
    if (userType==="faculty"){
      return (
        <Container style={{border:"2px solid blue", borderRadius:"10px",marginTop:"50px",padding:"50px"}}>
          <h2 className="text-center">SIGNUP</h2>
        <Form onSubmit={savedetails}>

        <Form.Group  controlId="formname">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={fname} onChange={(e)=>setfname(e.target.value)} placeholder="Enter your Full name" />
          </Form.Group>

          <Form.Group className="mt-3" controlId="formGridEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" value={femail} onChange={(e)=>setfemail(e.target.value)} placeholder="Enter Official Mail ID" />
          </Form.Group>
    
          <Form.Group className="mt-3" controlId="facultyID">
            <Form.Label>Faculty ID</Form.Label>
            <Form.Control type="text" value={facultyid} onChange={(e)=>setfacultyid(e.target.value)} placeholder="Eg. FA01" />
          </Form.Group>
    
          <Form.Group className="mt-3" controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={fpassword} onChange={(e)=>setfpassword(e.target.value)} placeholder="Password" />
          </Form.Group>
        
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:"15px"}}>
      <Button variant="primary" type="submit" className="my-3">
        SIGNUP
      </Button>
    
      
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="mb-0 me-2">Already Registered?</p>
        <Button className="my-3" onClick={() => navigate('/')}>
          LOGIN
        </Button>
      </div>
      </div>
      </Form>
        </Container>
      )
    }else if(userType==='parent'){
      return (

      <Container style={{border:"2px solid blue", borderRadius:"10px",marginTop:"50px",padding:"50px"}}>
        <h2 className="text-center">SIGNUP</h2>
        <Form onSubmit={savedetails}>
          <Form.Group  controlId="formGridEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" value={pmail} onChange={(e)=>setpmail(e.target.value)} placeholder="Enter your Email" />
          </Form.Group>
    
          <Form.Group className="mt-3" controlId="StudentUSN">
            <Form.Label>Student USN</Form.Label>
            <Form.Control type="text" value={usn} onChange={(e)=>setusn(e.target.value)} placeholder="Eg. 4SF22CS001" />
          </Form.Group>

          <Form.Group className="mt-3" controlId="Parentphone">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="number" value={pcontact} onChange={(e)=>setpcontact(e.target.value)} placeholder="Enter phone number"/>
            </Form.Group>

          <Form.Group className="mt-3" controlId="formGridPassword"> 
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={ppassword} onChange={(e)=>setppassword(e.target.value)} placeholder="Password" />
          </Form.Group>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:"15px"}}>
      <Button variant="primary" type="submit" className="my-3">
        SIGNUP
      </Button>
    
      
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="mb-0 me-2">Already Registered?</p>
        <Button className="my-3" onClick={() => navigate('/')}>
          LOGIN
        </Button>
      </div>
      </div>
      </Form>
        </Container>
      )
    }
  }
  return (
    <>
  
    {rendersignupform()}
    </>
  )
  
};
