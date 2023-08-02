
const { Category } = require('../models/category')
const {Product}=require('../models/product')
const mongoose=require('mongoose')

exports.postProduct=async(req,res)=>{
    try{
        const category=await Category.findById(req.body.category)
        if(!category){
            return res.status(404).json({message:"category doesnot exist"})
        }
        const product= new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,// "http://localhost:8000/public/upload/image-2323232"
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        })
       let result=await product.save()//save

       if(!product){
        return res.status(400).json({error:e})
       }
       res.status(201).json({data:result})

    }catch(e){
        console.log(e)
        res.status(400).json({error:e})

    } 
}

exports.getProduct=async(req,res)=>{

    try{
        //localhost:8000/api/vi/products?catagories=2345,34533
        let filter={}
        if(req.query.categories){
             filter={category:req.query.category.split(',')}
        }

        const productList=await Product.find(filter)

        // const productList=await Product.find().select('name image _id');//to get only name and image column excluding id
        if(!productList){
            res.status(500).json({success:false})
       }
       res.send(productList)
    }catch(e){
        res.status(400).json({error:e})
        console.log(e)
    }
   
}

exports.getSingleProduct=async(req,res)=>{
    try{
        const id=req.params.id
        const productList=await Product.findById(id).populate('category');
        if(!productList){
            res.status(500).json({success:false})
        }
    res.send(productList)
    }catch(e){
        res.status(400).json({error:e})
        console.log(e)
    }  
}


exports.updateProduct=async(req,res)=>{
    try{
        if(!mongoose.isValidObjectId){
            return res.status(404).json({message:"product doesnot exist"})
        }
        const category=await Category.findById(req.body.category)
        if(!category){
            return res.status(404).json({message:"category doesnot exist"})
        }
        const id =req.params.id
        const product=await Product.findByIdAndUpdate(id,{
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,// "http://localhost:8000/public/upload/image-2323232"
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
           
        }, {new:true}//indicates taht we want to return new updated data
        )
        
        if(!product){
            res.status(401).json({result:"product cannot be created"})
        }
        // res.status(201).json({result:category})
        res.send(product)    

    }catch(e){
        console.log(e);
        res.status(500).send("error while updating")
    }
}

exports.deleteProduct=async(req,res)=>{
    try{
        if(!mongoose.isValidObjectId){
            return res.status(404).json({message:"product doesnot exist"})
        }
        const {id}=req.params
        const result=await Product.findByIdAndRemove(id)
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

exports.getProductCount=async(req,res)=>{
    try{
        const productCount=await Product.countDocuments('_id') ;
        if(!productCount){
            res.status(500).json({success:false})
        }
    res.json({count:productCount})
    }catch(e){
        res.status(400).json({error:e})
        console.log(e)
    }  
}

exports.getFeaturedProduct=async(req,res)=>{
    try{
        const count=req.params.count?req.params.count:0
        const products=await Product.find({isFeatured:true}).limit(+count) ;
        if(!products){
            res.status(500).json({success:false})
        }
    res.send(products)
    }catch(e){
        res.status(400).json({error:e})
        console.log(e)
    }  
}

