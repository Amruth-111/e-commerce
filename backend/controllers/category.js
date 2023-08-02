
const {Category}=require('../models/category')

exports.getCategory=async(req,res)=>{
    try{
        const categoryList=await Category.find();
    if(!categoryList){
        res.status(500).json({success:false})
   }
   res.send(categoryList)
    }catch(e){
        console.log(e)
        res.status(400).json({error:e})
    }
}

exports.getSingleCategory=async(req,res)=>{
    try{
        const id=req.params.id
        const category=await Category.findById(id);
        if(!category){
            res.status(400).json({success:false})
       }
       res.status(200).send(category)
    }catch(e){
        console.log(e)
        res.status(400).json({error:e})
    }
}


exports.postCategory=async(req,res)=>{
    try{
        let category=await new Category({
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color
        })
        category=await category.save()
        if(!category){
            res.status(401).json({result:"category cannot be created"})
        }
        // res.status(201).json({result:category})
        res.send(category)    

    }catch(e){
        console.log(e)
        res.json({error:e})
    }
   
}

exports.deleteCategory=async(req,res)=>{
    try{
        const {id}=req.params
        const result=await Category.findByIdAndRemove(id)
        if(result){
            return res.json({message:"successfull",success:true})
        }else{
            return res.json({message:"error in delete method",success:false})
        }
    }catch(e){
        console.log(e)
        res.json({error:e})
    }
}

exports.updateCategory=async(req,res)=>{
    try{
        const id =req.params.id
        const category=await Category.findByIdAndUpdate(id,{
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color
           
        }, {new:true}//indicates taht we want to return new updated data
        )
        
        if(!category){
            res.status(401).json({result:"category cannot be created"})
        }
        // res.status(201).json({result:category})
        res.send(category)    

    }catch(e){
        console.log(e);
        res.status(500).send("error while updating")
    }
}