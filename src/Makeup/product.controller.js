const MakeupProducts = require("../Makeup/product.model");
const {model}=require('mongoose')

const createProduct=async(req,res)=>{
    try {
        const createProductList=await MakeupProducts.create(req.body)
        res.json({
            data:createProductList,
            message:"Product list Created successfully"
        })
        
    } catch (error) {
        res.json({
            Error:error,
        });
        
    }
};

const getProductDataByQuery =async (req,res)=>{
    try {
        let {BrandName} =req.query;
        let findproduct =await MakeupProducts.find({BrandName});
        if(!findproduct || findproduct.length === 0)
        {
            return res.status(404).json({
                message:"Data not found",
            });
        }
        res.json({
            data:findproduct,
        })    
    } catch (error) {
        res.json({
            Error: error,
        })
        
    }

};


const getProductDataAll =async (req,res)=>{
    try {

        let findproduct =await MakeupProducts.find()
        if(!findproduct || findproduct.length === 0)
        {
            return res.status(404).json({
                message:"Data not found",
            });
        }
        res.status(200).json({
            data:findproduct,
        })    
    } catch (error) {
        res.json({
            Error: error,
        })
        
    }

};

const getuserdatabasedonobjectid = async (req, res) => {  //http://localhost:4000/getuserdatabasedonobjectid?objectId=668ec0e8aae60754fc55d57d
    try {
      let { objectId } = req.query;
      let getuserdata = await MakeupProducts.findById(objectId);
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

const editProductListBasedOnfindByIdAndUpdate = async(req,res)=>{
    try {
        let {objectId} =req.query;
        const updateProductList =await MakeupProducts.findByIdAndUpdate(objectId, req.body, {new:true})
        if(!updateProductList){
            res.json({
                message:"data not found"
            })
        };
        res.json({
            data:updateProductList,
        })

    } catch (error) {
        res.json({
            Error:error
        })
        
    }

};



const deleteProductListBasedOnfindByIdandDelete = async(req,res)=>{
try {
    let {objectId}=req.query;
    const deleteProductList = await MakeupProducts.findByIdAndDelete(objectId);
    if(!deleteProductList){
        return res.status(404).json({
            message:"No Data Found"
        })
    };
    res.json({
        data:deleteProductList,
        message:"Data Deleted Successfully"
    });
} catch (error) {
    res.json({
        Error:error
    })
    
}
    
}

const getProductData = async (req, res) => {
    try { 
        console.log(req.params);
      let {id}=req.params;
    //   console.log(id);
      let viewdetail=await MakeupProducts.findById(id)
      console.log(viewdetail);
      if (!viewdetail) {
        return res.status(404).json({
          message: "Data not found"
        });
      }
      res.json({...viewdetail.toObject()});
    } catch (error) {
      res.json({
        Error: error,
  });
  }
  };

module.exports=
{
    createProduct,
    getProductDataByQuery,
    getProductDataAll,
    editProductListBasedOnfindByIdAndUpdate,
    deleteProductListBasedOnfindByIdandDelete,
    getuserdatabasedonobjectid,
    getProductData
}