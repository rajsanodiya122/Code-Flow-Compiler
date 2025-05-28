const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const StudentModel = require('./models/Student')
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/DriveData')

app.post('/signup',(req, res) =>{
    StudentModel.create(req.body)
    .then(Drive => res.json(Drive))
    .catch(err => console.log(err))
})

app.post('/login',(req, res) =>{
const {email, password} = req.body
StudentModel.findOne({email : email})
.then(user =>{
    if(user){
        if(user.password == password){
            res.json("Success")
        }
        else{
            res.json("Password is incorrect")
        }
    } else{
        res.json("User Doesnt exist")
    }
})
})

app.listen(3000, () =>{
    console.log("Server is running")
})