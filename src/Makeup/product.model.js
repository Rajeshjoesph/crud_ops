const mongoose=require("mongoose")

const MakeupProductsSchema=new mongoose.Schema({
    BrandName:{
        type:String,
        require:true,
    },
    ProductName:{
        type:String,
        require:true,
    },
    Price:{
        type: Number,
        require: true,
    },
    Longevity:{
        type:String,
        require:true,
    },
    ManufactureDate:{
        type:String,
    },
    ExpiryDate:{
        type:String,
    },
    Message:{
        type:String,
        default:"MAKEUP IS ART"
    }
},
{timestamps:true}
);

const MakeupProducts=mongoose.model("MakeupProducts", MakeupProductsSchema);

module.exports=MakeupProducts;