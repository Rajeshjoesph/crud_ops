const express=require("express")
const router=express.Router();
const productController=require("../Makeup/product.controller")

router
.route("/MakeupProductDetails")
.post(productController.createProduct)
.get(productController.getProductDataByQuery)
.put(productController.editProductListBasedOnfindByIdAndUpdate)
.delete(productController.deleteProductListBasedOnfindByIdandDelete)

router
.route("/retrivebyID")
.get(productController.getuserdatabasedonobjectid)
router
.route("/getall")
.get(productController.getProductDataAll)

router
.route("/retrivebasedID/:id")
.get(productController.getProductData)


module.exports=router;