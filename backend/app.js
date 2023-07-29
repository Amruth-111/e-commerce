const express=require('express')
const bodyParser=require('body-parser')
const morgan=require('morgan')
const mongoose=require('mongoose')
require('dotenv').config






const app=express()
app.use(bodyParser.json())
app.use(morgan('tiny'))

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("connected to db")
})
.catch((e)=>{
    console.log(e)
})
app.listen(3000,()=>{
    console.log("app started")
})

