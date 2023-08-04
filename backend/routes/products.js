
const express=require('express')
const routes=express.Router()
const multer  = require('multer')
// const path=require('path')

const products=require('../controllers/products')

const FILE_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValidFile=FILE_TYPE_MAP[file.mimetype]
        let uploadError=new Error('invalid image type')
        if(isValidFile){
            uploadError=null
        }
      cb(uploadError, 'public/uploads'); // Files will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        const extension=FILE_TYPE_MAP[file.mimetype]
      // Generate a unique filename for each uploaded file (you can customize this if needed
     const fileName=file.originalname.split(" ").join('_')
      cb(null, `${fileName }-${Date.now()}.${extension}`);
    }
  });

  
const upload = multer({ storage: storage });

routes.get('/',products.getProduct)

routes.post('/',upload.single('image'),products.postProduct)
routes.get('/:id',products.getSingleProduct)
routes.put('/:id',products.updateProduct)
routes.put('/gallery-images/:id',upload.array('images',10),products.galleryImagesProduct)
routes.delete('/:id',products.deleteProduct)
routes.get('/get/count',products.getProductCount)
routes.get('/get/featured/:count',products.getFeaturedProduct)

module.exports=routes