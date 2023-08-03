const mongoose=require('mongoose')

const orderItemSchema=mongoose.Schema({

    quantity:{
        type:Number,
        require:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }

});

orderSchema.virtual('id').get(function(){
    this._id.toHexString();
});
orderSchema.set('toJSON',{
    virtuals:true
});

exports.OrderItems=mongoose.model('OrderItems',orderItemSchema)

