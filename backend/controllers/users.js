
const {User}=require('../models/users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.getUsers=async(req,res)=>{
    const userList=await User.find().select("-passwordHash");
    if(!userList){
        res.status(500).json({success:false})
   }
   res.send(userList)
}

exports.postUser=async(req,res)=>{
    try{
        let user=await new User({
            name:req.body.name,
            email:req.body.email,
            passwordHash:bcrypt.hash(req.body.passwordHash,10),
            phone:req.body.phone,
            isAdmin:req.body.isAdmin,
            apartment:req.body.apartment,
            zip:req.body.zip,
            city:req.body.city,
            country:req.body.country,

        })
        user=await user.save()
        if(!user){
            res.status(401).json({result:"category cannot be created"})
        }
        // res.status(201).json({result:category})
        res.send(user)    

    }catch(e){
        console.log(e)
        res.json({error:e})
    }
   
}

exports.getSingleUser=async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findById(id).select("-passwordHash");
        if(!user){
            res.status(500).json({success:false})
        }
    res.send(user)
    }catch(e){
        res.status(400).json({error:e})
        console.log(e)
    }  
}

exports.loginUser=async(req,res)=>{
    try{
        const email=req.body.email
        console.log(email)
        const user=await User.findOne({email:email})
        console.log(user.passwordHash)
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        if(user && bcrypt.compare(req.body.password,user.passwordHash )){
            const token=jwt.sign({
                userid:user.id
            },process.env.JWT_KEY,{expiresIn:"1w"})

            res.status(201).json({success:true ,message:"login successfull",token:token})
        }else{
            res.status(400).json({success:false ,message:"incorrect password"})
        }
        
    }catch(e){
        res.status(404).json({success:false,message:e})
        console.log(e)
    }
}