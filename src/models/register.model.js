const mongoose=require("mongoose")


const registerSchema =new mongoose.Schema({
    userName:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique : true,
        require : true,
    },
    age:{
        type: Number,
        require: true,
    },
    mobileNo:{
        type: Number,
    },
    password:{
        type: String,
    },
    testField:{
        type: String,
        default: "test"
    },
    filename:{
        type: String,
    },
    originalname:{
        type: String,
    },
    destination:{
        type: String
    }


},
{ timestamps: true}
);

const register =mongoose.model("register", registerSchema);

module.exports=register;