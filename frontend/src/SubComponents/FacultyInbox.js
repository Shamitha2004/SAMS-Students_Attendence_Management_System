import React, { useEffect, useState } from 'react'
import Axios from "axios"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import moment from 'moment-timezone'
import { useNavigate } from 'react-router-dom';






export const FacultyInbox = () => {
  const navigate=useNavigate()
    const[messages,setmessages]=useState([])
   
    const getMessages=async()=>{
        const response=await Axios.get("http://localhost:8000/getfacultymessages")
        
        console.log("api response",response.data)
        setmessages(response.data.data)
       
      }

useEffect(()=>{
getMessages()
},[])

  return (
  <>
  
  <h1 className='text-center mb-5 mt-5'>FACULTY - INBOX</h1>
  <div>{
    messages.length===0 ? (
      <p>No Messages Found</p>
    ) : (
      messages.map((message,index)=>(
        <Card key={message._id} className='m-5'>
          <Card.Header className='d-flex justify-content-between align-items-center'>
            
            <div>
            {message.studentUsn}
              </div>
              <div>
                {moment(message.updatedAt).tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss')}
              </div>
              
              </Card.Header>
          <Card.Body>
            <Card.Title>{message.subject}</Card.Title>
            <Card.Text>
              {message.msg}
            </Card.Text>
            <Button variant="success" onClick={()=>navigate('notifyparentpage')}>Reply</Button>
          </Card.Body>
        </Card>
      ))
    )
    }
    
  </div>

  
    
  



  </>
  )
}
