const express=require('express')
const bodyParser=require('body-parser')
const morgan=require('morgan')
// const multer  = require('multer')
// const path=require('path')
const cors=require('cors')
const ejwt=require('./middleware/auth')
const errorHandler=require('./middleware/error_handler')

const mongoose=require('mongoose')
require('dotenv').config
const api=process.env.API

//routes
const productsRoutes=require('./routes/products')
const categoriesRoutes=require('./routes/categories')
const usersRoutes=require('./routes/users')
const ordersRoutes=require('./routes/orders')


const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(ejwt())
app.use(errorHandler)

app.use(`${api}/products`,productsRoutes)
app.use(`${api}/categories`,categoriesRoutes)
app.use(`${api}/users`,usersRoutes)
app.use(`${api}/orders`,ordersRoutes)




mongoose.connect(process.env.CONNECTION_STRING)
.then((res)=>{
   
    // console.log(res)
    console.log("connected to db")
})
.catch((e)=>{
    console.log(e)
})

app.listen(8000,()=>{
    console.log("app started")
})

