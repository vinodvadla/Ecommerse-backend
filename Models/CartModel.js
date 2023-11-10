const mongoose=require('mongoose')

let CartSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    cart:[]
})


let Cart=mongoose.model('Cart',CartSchema)

module.exports=Cart
