import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Table,Spinner } from 'react-bootstrap'



export const IAAttendance = () => {
  const [iadata,setiadata]=useState([])
const getiaattendance=async()=>{
  const response = await Axios.get("http://localhost:8000/getiaAttendance")
  setiadata(response.data)
}

useEffect(()=>{
  getiaattendance()
  },[])

  return (
    <>
    
    <div className='m-5'>


    <Table  striped bordered rounded hover responsive>
    <thead>
      <tr>
        <th>USN</th>
        <th>Enrolled Subjects</th>
        <th>Marks</th>
        <th>Attendance (%)</th>
      </tr>
    </thead>
    <tbody>
      {iadata.length > 0 ? (
        iadata.map((student) => (
          <tr key={student._id}>
            <td>{student.usn}</td>
            <td>{student.enrolledsubjects.join(", ")}</td>
            <td>{student.marks.join(", ")}</td>
            <td>{student.attendance}%</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4">
            <Spinner animation="border" variant="primary" />
            Loading...
          </td>
        </tr>
      )}
    </tbody>
  </Table>
  
    </div>
    
    </>
  )
}
