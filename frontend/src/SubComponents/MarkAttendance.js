import React from "react";
import { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";

export const MarkAttendance = () => {
  const [sheet, setsheet] = useState([]);
  const [loading, setloading] = useState(true);
  const [formHidden, setFormHidden] = useState({}); //has list of students' checkbox states
  const [isInitialized, setIsInitialized] = useState(false);
  const [uusn,setuusn]=useState('')


  const getattendancesheet = async () => {
    const response = await Axios.get(
      "http://localhost:8000/getattendancesheet"
    );
    setsheet(response.data);
    setuusn(response.data.usn)
    setloading(false);
  };

  const handleCheckboxChange = (studentId) => {
    setFormHidden((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId], 
    }));
  };

  const [subject, setsubject] = useState('Regarding Attendance');
  const [body, setbody] = useState('Your Ward is Absent for the Class');

const sendAttendanceMessage=async(e)=>{
e.preventDefault()
console.log("formhidden2",formHidden)
const unCheckedStudentList = Object.keys(formHidden).filter((studentId)=> !formHidden[studentId])
console.log(unCheckedStudentList)
alert("Check console")
let phonenum;

for(let studentId of unCheckedStudentList){
  const student=sheet.find((std)=> std._id===studentId)
  if(student){
    const {usn}=student
    console.log('USN:', usn);

    try{
      const retrieveParentPhone = await Axios.post( "http://localhost:8000/classAttendance",{
        usn
      })
      phonenum=retrieveParentPhone.data
      // console.log(JSON.stringify(phonenum))
    }catch(error){
      alert("error fetching phone number")
    }
    try{
      const classAttendance = await Axios.post("http://localhost:8000/sendclassattendance",{
        usn,subject,body,phonenum
      })
      // alert("sendclass attendance")
      console.log("Sent Message")
    }catch(error){
      alert("error sending message")
    }
  }
}

}

useEffect(() => {
  if (!isInitialized) {
    getattendancesheet();
  }
}, [isInitialized]);


  useEffect(() => {
    
    if (sheet.length>0 && !isInitialized){
      const initialiseCheckboxes = sheet.reduce((acc,student)=>{
        acc[student._id]=false
        return acc;
      },{})
      setFormHidden(initialiseCheckboxes);
      setIsInitialized(true)
     
    }
  }, [sheet,isInitialized]);

useEffect(() => {
 console.log("formhidden",formHidden)
}, [formHidden])


  return (
    <>
      <h3 className="m-5">Attendance Sheet</h3>
      <div className="m-5">
        <Form onSubmit={sendAttendanceMessage}>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th className="p-3">USN</th>
                <th className="p-3">Name</th>
                <th className='text-center p-3 ' colSpan={2}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4">
                    <Spinner animation="border" variant="primary" />
                    Loading...
                  </td>
                </tr>
              ) : sheet.length > 0 ? (
                sheet.map((student) => (
                  <tr key={student._id}>
                    <td>{student.usn}</td>
                    <td>{student.name}</td>
                    <td className="d-flex  align-items-center">
                      <div className="d-flex  align-items-center">
                    {!formHidden[student._id] && (
                      <Row className="align-items-center">
                        <Col xs={5} className="align-items-center">
                          <Form.Label htmlFor="MessageSubject">
                            Subject
                          </Form.Label>
                          <Form.Control
                          type="text"
                          value={subject}
                          onChange={(e)=>setsubject(e.target.value)}
                            className="mb-2"
                            id="MessageSubject"
                            placeholder="Regarding Attendance"
                          />
                        </Col>
                        <Col  xs={7} className=" align-items-center">
                          <Form.Label htmlFor="MessageBody">Body</Form.Label>
                          <Form.Control
                          type="text"
                          value={body}
                          onChange={(e)=>setbody(e.target.value)}
                          className="mb-2"
                            id="MessageBody"
                            placeholder="Your Ward is Absent for the Class"
                          />
                          

                          </Col>
                          </Row>
                        )}
                        
                        </div>
                      {/* </td> */}
                      {/* <td className="text-center align-middle" style={{ flex: 1 }}> */}

                      <Col   className="d-flex justify-content-center align-items-center">
                <Form.Check
                  type="checkbox"
                  id={`autoSizingCheck-${student._id}`}
                  className="mb-2 align-items-center "
                  style={{ transform: "scale(1.5)" }}
                  checked={formHidden[student._id] || false}
                  onChange={() => handleCheckboxChange(student._id)}
                />
              </Col>
                      </td>
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
          <div className="text-end mt-3">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
