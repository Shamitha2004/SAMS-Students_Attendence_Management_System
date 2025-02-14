import express from "express";
import mongoose from "mongoose";
import cors from "cors"

import twilio from 'twilio';
const port = 8000
const app = express() 
app.use(cors())
app.use(express.json())

const accountSid='*************'
const authToken='***********'
const client = new twilio(accountSid, authToken);

//database connectivity
mongoose.connect('mongodb+srv:*********')
.then(()=>{
    console.log("Database Connected")
})
.catch((error)=>{
    console.log(error)
})

//mongoose Schema for faculty
let facultySchema = new mongoose.Schema({
    //fields
    //mongoose data-type
    fname : { type : String },
    femail : { type : String },
    fpassword : { type : String },
    facultyid : { type : String }
}, {timestamps : true}
)

let parentSchema = new mongoose.Schema({
    pmail :{type:String},
    ppassword:{type:String},
    usn:{type:String},
    pcontact:{type:Number}
},{timestamps:false})

let parentmessageSchema = new mongoose.Schema({
    facultyMail:{type:String},
    parentMail:{type:String},
    studentUsn:{type:String},
    phone:{type:Number},
    subject:{type:String},
    msg:{type:String}
},{timestamps:true})

let facultymessageSchema = new mongoose.Schema({
    facultyMail:{type:String},
    parentMail:{type:String},
    studentUsn:{type:String},
    
    subject:{type:String},
    msg:{type:String}
},{timestamps:true})

let studentSchema = new mongoose.Schema({
    usn:{type:String},
    name:{type:String},
    stmail:{type:String},
    extracurricular:{type:[String]}
})

let enrolledsubSchema=new mongoose.Schema({
    usn:{type:String},
    enrolledsubjects:{type:[String]},
    marks:{type:[Number]},
    attendance:{type:Number}
})

//create Model for Schema

let userModel1 = new mongoose.model('Faculty', facultySchema )
let userModel2 = new mongoose.model('Parent', parentSchema )
let ParentMsgModel = new mongoose.model('ParentMessage',parentmessageSchema)
let FacultyMsgModel = new mongoose.model('FacultyMessage',facultymessageSchema)
let student = new mongoose.model('Student',studentSchema)
let enrolledSubjectsSchema = new mongoose.model('EnrolledSubject',enrolledsubSchema)

//async-await : used while dealing with databases
let createFaculty = async function(req, res){
    let {fname,femail,fpassword,facultyid} = req.body; //fetching request from postman body
    let result = await userModel1.create(
        {fname,femail,fpassword,facultyid}
    );
    res.status(200).json({msg : "New Faculty Registered", data : result})
}

let createParent = async function(req, res){
    let {pmail,ppassword,usn,pcontact} = req.body; 
    console.log("Received data: ",{pmail,ppassword,usn,pcontact})
    let result = await userModel2.create({pmail,ppassword,usn,pcontact});
    res.status(200).json({msg : "New Parent Registered", data : result})
}


let createParentMessage=async function(req,res){
    let {facultyMail,parentMail,studentUsn,phone,subject,msg}=req.body;
    console.log("Received message ",{parentMail,studentUsn,phone,subject,msg})
    let result = await ParentMsgModel.create({facultyMail,parentMail,studentUsn,phone,subject,msg})
    console.log("Result",result)
    res.status(200).json({msg:"A new Message added to DB", data:result})
    try {
        const message = await client.messages.create({
            body: `${subject}\n\n${msg}`,
           
            from:'+*********',
            
            to:'*******' 
        });
        console.log('Message SID:', message.sid);
    } catch (err) {
        console.error('Error sending message:', err.message || err);
    }
}


let createFacultyMessage=async function(req,res){
    let {parentMail,facultyMail,studentUsn,subject,msg}=req.body;
    console.log("Received message ",{parentMail,facultyMail,studentUsn,subject,msg})
    let result = await FacultyMsgModel.create({parentMail,facultyMail,studentUsn,subject,msg})
    console.log("Result",result)
    res.status(200).json({msg:"A new Message added to DB", data:result})
   



let loginFacultyData = async function(req, res){
    let {facultyid,fpassword}=req.body
    let data = await userModel1.find({facultyid, fpassword})
    
    console.log(data)
    res.status(200).json(data)
}


let loginParentData = async function(req, res){
    let {pmail,usn}=req.body
    let data = await userModel2.find({pmail,usn})
   
    console.log(data)
    res.status(200).json(data)
}

let getparentmessages=async function(req,res){
    let data=await ParentMsgModel.find().sort({ updatedAt: -1 })
    console.log(data)
    res.status(200).json({msg : "All Inbox messages", data : data})
}

let getfacultymessages=async function(req,res){
    let data=await FacultyMsgModel.find().sort({ updatedAt: -1 })
    console.log(data)
    res.status(200).json({msg : "All Inbox messages", data : data})
}

let getiaAttendance=async function(req,res){
    let data=await enrolledSubjectsSchema.find()
    console.log(data)
    res.status(200).json(data)
}

let getAttendanceSheet = async function(req,res){
    let data=await student.find({},'usn name')
    console.log(data)
    res.status(200).json(data)
}

let classAttendance=async function(req,res){
    let {usn} = req.body;
    let phoneNumberofParent= await userModel2.find({usn},'pcontact')
    console.log(phoneNumberofParent)
    res.status(200).json(phoneNumberofParent)

}

let sendClassAttendance = async function(req,res){
let {Usn,subject,body,phonenum}=req.body
console.log("Received data:", req.body);
let studentUsn=req.body.usn
let phone = phonenum[0].pcontact;

let response = await ParentMsgModel.create({studentUsn,subject,msg:body,phone})
console.log("Result",response)
res.status(200).json({msg:"A new Message added to DB"})

phone = phone.toString();
if (phone && !phone.startsWith('+')) {
    phone = '+' + phone;
  }

try {
    const message = await client.messages.create({
        body: `${subject}\n\n${body}`,
        
        from:'********',
        
        to:'+*********'  
    });
    console.log('Message SID:', message.sid);
} catch (err) {
    console.error('Error sending message:', err.message || err);
}
}


app.post('/createfaculty', createFaculty);
app.post('/createparent', createParent);
// app.get('/getfacultydata', getFaculty);
app.post('/loginFacultyData',loginFacultyData)
app.post('/loginParentData',loginParentData)

app.post('/addnewparentmessage',createParentMessage)
app.post('/addnewfacultymessage',createFacultyMessage)

app.get('/getparentmessages',getparentmessages)
app.get('/getfacultymessages',getfacultymessages)

app.get('/getiaattendance',getiaAttendance)

app.get('/getattendancesheet',getAttendanceSheet)

app.post('/classAttendance',classAttendance)

app.post('/sendclassattendance',sendClassAttendance)

//listen functionality
app.listen(port, ()=>{
    console.log(`Server running at ${port}`);
})
