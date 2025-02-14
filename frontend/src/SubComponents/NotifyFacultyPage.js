import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Axios from "axios"
import { useNavigate } from "react-router-dom";




function NotifyFacultyPage() {
  const navigate=useNavigate();
  const [facultyMail,setfacultyMail]=useState('')
const [parentMail,setparentMail]=useState('')
const [studentUsn,setstudentUsn]=useState('')
// const [phone,setphone]=useState('')
const [subject,setsubject]=useState('')
const [msg,setmsg]=useState('')



  const sendMsgDetails=async(e)=>{
    e.preventDefault();
    try{
      await Axios.post("http://localhost:8000/addnewfacultymessage",{
        facultyMail,parentMail,studentUsn,subject,msg
      })
      alert("Message sent Successfully!!")
    }catch(error){
      console.log("Error sending message",error)
      alert("Failed to send message")
    }
    clearfields();
  }

  const clearfields=()=>{
    setfacultyMail('')
    setparentMail('')
    setstudentUsn('')
    // setphone('')
    setsubject('')
    setmsg('')
  }



  return (
    <div className="container mt-4">
      {/* Compose Email Header */}
      <div className="d-flex justify-content-between align-items-center p-2 bg-light border rounded">
        <h5>Compose</h5>
        {/* <Button variant="close" onClick={navigate('/notifyparentcard')} aria-label="Close"></Button> */}
      </div>

      {/* Compose Form */}
      <Form className="p-3 border rounded bg-white" onSubmit={sendMsgDetails}>
        
        <Form.Group className="mb-3" controlId="formFrom">
          <Form.Label>From</Form.Label>
          <Form.Control type="email" value={parentMail} onChange={(e)=>setparentMail(e.target.value)} placeholder="Enter your Mail" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTo">
          <Form.Label>To</Form.Label>
          <Form.Control type="email" value={facultyMail} onChange={(e)=>setfacultyMail(e.target.value)} placeholder="Enter faculty email" />
        </Form.Group>

       
        <Form.Group className="mb-3" controlId="studentstudentUsn">
          <Form.Label>Student Usn</Form.Label>
          <Form.Control type="text" value={studentUsn} onChange={(e)=>setstudentUsn(e.target.value)} placeholder="Enter Student Usn" />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="ParentPhone">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control type="text" value={phone} onChange={(e)=>setphone(e.target.value)} placeholder="Enter Contact Number" />
        </Form.Group> */}

        {/* Subject Field */}
        <Form.Group className="mb-3" controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" value={subject} onChange={(e)=>setsubject(e.target.value)} placeholder="Enter message subject" />
        </Form.Group>

        {/* Message Body */}
        <Form.Group className="mb-3" controlId="formBody">
          <Form.Label>Message</Form.Label>
          <Form.Control
          value={msg}
          onChange={(e)=>setmsg(e.target.value)}
            as="textarea"
            rows={6}
            placeholder="Write your message here..."
          />
        </Form.Group>

        {/* Actions */}
        <div className="d-flex justify-content-between">
          <Button type="submit" variant="primary">Send</Button>
          <div>
      
            <Button variant="danger" onClick={clearfields}>Discard</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default NotifyFacultyPage;