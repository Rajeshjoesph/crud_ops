const register=require("../models/register.model")
const fs=require("fs")
const bcrypt=require("bcrypt"); //email
const {generatePassword}=require("../utils/generatePassword") //email
const {passwordSent}=require("../utils/email") //email


const createUser = async (req, res) => {
  try {
    let { email } = req.body;  //let email=req.body.email
    let file =req.file; //multer
    console.log(file);
    let checkEmail = await register.findOne({ email: email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exist",
      })
    };
console.log("twtsa");
    let password=await generatePassword(8)  
    console.log("tes", password);              //email
    let hashedPassword=await bcrypt.hash(password, 10);   //email

    let data={       //multer
      ...req.body,   //multer
      password:hashedPassword           //email
    }
console.log("data", data);
    if(file){                                   //multer
      
        data.filename=file.filename,            //multer
        data.originalname= file.originalname,   //multer
        data.destination= file.destination      //multer
      
    }                                           //multer
    const createUser = await register.create(data); //normalpostmethod-req.query,multer-data
    await passwordSent(email,password,createUser.userName)
    res.json({
      data: createUser,
      message: "user register successfully",
    });
  } catch (error) {
    res.json({
      Error: error,
    })
  }
};


const getuserdatasbyquery = async (req, res) => {   //http://localhost:4000/getuserdatasbyquery?age=25
  try {
    let { age } = req.query;
    let findUsers = await register.find({ age });
    if (!findUsers || findUsers.length === 0) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    res.json({
      data: findUsers,
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};






const getuserdatasbyparams = async (req, res) => {  //http://localhost:4000/getuserdatasbyparams/25
  try {
    let age = req.params.id;
    let findUsers = await register.find({ age });
    if (!findUsers || findUsers.length === 0) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    res.json({
      data: findUsers,
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

const getuserdatabasedonobjectid = async (req, res) => {  //http://localhost:4000/getuserdatabasedonobjectid?objectId=668ec0e8aae60754fc55d57d
  try {
    let { objectId } = req.query;
    let getuserdata = await register.findById(objectId);
    if (!getuserdata) {
      return res.json.status(404)({
        message: "Data not found",
      });
    }
    res.json({
      data: getuserdata,
    });
  } catch (error) {
    res.json({
      Error: Error,
    });
  }
};





const getuserdadtabyfindone = async (req, res) => {  //http://localhost:4000/getuserdadtabyfindone?password=Vicky123
  try {
    let { password } = req.query;
    const getuserdata = await register.findOne({ password });
    if (!getuserdata) {
      return res.json.status(404)({
        message: "Data not found",
      });
    }
    res.json({
      data: getuserdata,
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};




const edituserBasedOnObjectId = async(req,res)=>{ //update pandra id potutu enna update pannanumo adha type pantu send pananu
  try {
   let {objectId} = req.query;
    const updateUser = await register.findByIdAndUpdate(objectId, req.body, { new:true})
    if(!updateUser){
      res.json({
        message:"Data not found"
      })
    };
    res.json({
      data:updateUser
    })
    
  } catch (error) {
    res.json({
      Error:error
    }) 
  }
};




const edituserBasedOnupdateOne=async(req,res)=>{
  try {
    let {age} = req.query;
    const updateuser = await register.updateOne({age} ,req.body,{new : true});
    res.json({
      data:updateuser
    });
    
  } catch (error) {
    res.json({
      Error:error
    })
    
  }
};





const edituserBasedOnupdateMany=async(req,res)=>{
  try {
    let {age} = req.query;
    const updateuser = await register.updateMany({age} ,req.body,{new : true});
    res.json({
      data:updateuser
    });
    
  } catch (error) {
    res.json({
      Error:error
    })
    
  }
};



const deleteuserBasedOndeleteOne=async(req,res)=>{
  try {
    let {objectId} = req.query;
    const updateuser = await register.deleteOne();
    res.json({
      data:updateuser
    });
    
  } catch (error) {
    res.json({
      Error:error
    })
    
  }
};

const deleteuserBasedOndeletemany=async(req,res)=>{
  try {
    let {age} = req.query;
    const findUser = await register.findOne({age});
    if(!findUser){
      return res.status(404).json({
        message:"No data found"
      })
    }
    const updateuser = await register.deleteMany({age});
    res.json({
      data:updateuser
    });
    
  } catch (error) {
    res.json({
      Error:error
    })
    
  }
}

const deleteuserBasedOnfindByIdandDelete=async(req,res)=>{
  try {
    let {objectId} = req.query;
    console.log("test", objectId);
    const deleteuser = await register.findByIdAndDelete(objectId);
    if(!deleteuser){
      return res.status(404).json({
        message:"No data found"
      })
    };
    
    res.json({
      data:deleteuser,
      message:"data deleted successfully"
    });
    
  } catch (error) {
    res.json({
      Error:error
    })
    
  }
};

const multerDeleteBasedOnObjectId = async (req,res)=>{
  try {
    let {objectId} =req.query;
    const deleteuser = await register.findById(objectId);
    if(deleteuser.filename){
      let path = deleteuser.destination;
      let fileName = deleteuser.filename;
      let filePath = `${path}/${fileName}`
      fs.unlinkSync(filePath)
    }
    await deleteuser.deleteOne();
    if(!deleteuser){
      return res.status(404).json({
        message:"No Data Found"
      })
    };
    res.json({
      data:deleteuser,
      message:"Data Deleted successfully"
    })
  } catch (error) {
    res.json({
      Error:error
    })
  }
}




const multereditUserBasedOnObjectId = async (req, res) => {
    try {

        let { objectId } = req.query;
 
        let newFile = req.file;
        let findExisting = await register.findById(objectId);
        if (!findExisting) {
            return res.status(404).json({ message: "No Data Found" })
        };

        if (findExisting.filename) {
            let path = findExisting.destination;
            let fileName = findExisting.filename;
            let filePath = `${path}/${fileName}`
            await fs.unlinkSync(filePath)
        };

        let data = {
            ...req.body
        };

        if (newFile) {
            data.filename = newFile.filename;
            data.destination = newFile.destination;
            data.originalname = newFile.originalname
        }

        const updateUser = await register.findByIdAndUpdate(objectId, data, { new: true });
       
        res.json({
            data: updateUser
        })

    } catch (error) {
        res.json({
            Error: error
  })
}
};


module.exports={
    createUser,
    getuserdatasbyquery,
    getuserdatasbyparams,
    getuserdatabasedonobjectid,
    getuserdadtabyfindone,
    edituserBasedOnObjectId,
    edituserBasedOnupdateOne,
    edituserBasedOnupdateMany,
    deleteuserBasedOndeleteOne,
    deleteuserBasedOndeletemany,
    deleteuserBasedOnfindByIdandDelete,
    multerDeleteBasedOnObjectId,
    multereditUserBasedOnObjectId
}