const express=require('express')

const routes=express.Router()

const users=require('../controllers/users')

routes.get('/',users.getUsers)
routes.post('/',users.postUser)

module.exports=routes